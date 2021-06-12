import React, { useEffect } from "react";
import { Terminal } from "xterm";

const TerminalComponent = () => {
  useEffect(() => {
    var term = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
    });
    let curr_lines = "";
    let entries = [];
    let cursor = 0;
    term.open(document.getElementById("terminal"));
    term.write("Codeddit \x1B[1;3;31mxterm.js\x1B[0m ~$ ");
    term.onData((data) => {
      const code = data.charCodeAt(0);
      term.write(data);
      if (code == 27) {
        switch (data.substr(1)) {
          case "[C": // Right arrow
            if (cursor < curr_lines.length) {
              cursor += 1;
              term.write(data);
            }
            break;
          case "[D": // Left arrow
            if (cursor > 0) {
              cursor -= 1;
              term.write(data);
            }
            break;
          default:
            break;
        }
      } else if (code == 13) {
        // CR
        term.write("\r\nYou typed: '" + curr_lines + "'\r\n");
        term.write("Codeddit \x1B[1;3;31mxterm.js\x1B[0m ~$ ");
        curr_lines = "";
      } else if (code < 32 || code == 127) {
        // Control
        return;
      } else {
        curr_lines =
          curr_lines.substr(0, cursor) + data + curr_lines.substr(cursor);
      }
    });
    // term.onKey(({ key, domEvent }) => {
    //   if (domEvent.e) {
    //     if (curr_lines) {
    //       entries.push(curr_lines);
    //       term.write("\r\n");
    //     } else {
    //       curr_lines += key;
    //       term.write(key);
    //     }
    //   }
    // });
  }, []);

  return <div id="terminal" />;
};

export default TerminalComponent;
