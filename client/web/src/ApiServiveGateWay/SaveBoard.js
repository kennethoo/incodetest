import * as Y from "yjs";
import * as awarenessProtocol from "y-protocols/awareness";
import { oneDark } from "@codemirror/theme-one-dark";

import socket from "realtimeBoardSocket";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";

import { EditorState } from "@codemirror/state";
import { yCollab } from "y-codemirror.next";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { go } from "@codemirror/lang-go";
import { markdown } from "@codemirror/lang-markdown";

import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
} from "@codemirror/language";

import { lintKeymap } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
const darkTheme = EditorView.theme(
  {
    "&": {
      height: "100%",
      backgroundColor: "#1f2125", // Background
    },
    ".cm-content": {
      caretColor: "white", // Caret color
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(111, 86, 229, 0.2)", // Selection
    },
    ".cm-line": {
      background: "transparent", // Line highlight
    },
    ".cm-gutters": {
      backgroundColor: "#1f2125", // Gutter background
      color: "#8a919966", // Gutter foreground
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent", // Active line gutter highlight
    },
  },
  { dark: true } // Specify this is a dark theme
);

const EXTENSION_TO_LANGUAGE = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  rb: "ruby",
  php: "php",
  java: "java",
  cpp: "cpp",
  cs: "csharp",
  html: "html",
  css: "css",
  xml: "xml",
  json: "json",
  go: "go",
  rs: "rust",
  kt: "kotlin",
  swift: "swift",
  scala: "scala",
  sql: "sql",
  r: "r",
  md: "markdown",
  sh: "bash",
  ps1: "powershell",
  yaml: "yaml",
  toml: "toml",
  ini: "ini",
  dart: "dart",
};

// this board is the genral codeboad for normal , preview and collaboration
class Codeboard {
  constructor({
    instance,
    username,
    ref,
    extension,
    projectId,
    filename,
    userId,
  }) {
    this.boardId = instance;
    this.ref = ref;
    this.ydoc = new Y.Doc();
    this.awareness = null;
    this.username = username;
    this.yText = this.ydoc.getText("sharedtext");
    this.extension = extension;
    this.socket = socket;
    this.isUpdatingFromYText = true;
    this.projectId = projectId;
    this.filename = filename;
    this.isDocumentReady = false;
    this.userId = userId;
    this.firstRender = true;

    this.basicExtetion = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      oneDark,
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      darkTheme,
      highlightActiveLine(),
      highlightSelectionMatches(),
      this.getLanguage(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),
    ];
  }

  getLanguage() {
    switch (EXTENSION_TO_LANGUAGE[this.extension]) {
      case "javascript":
        return javascript();
      case "typescript":
        return javascript()();
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      case "html":
        return html();
      case "css":
        return css();
      case "json":
        return json();
      case "go":
        return go();
      case "markdown":
        return markdown();
      default:
        return markdown();
    }
  }

  setupBasicCodeboard = (code) => {
    this.view = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: [...this.basicExtetion],
      }),
      parent: this.ref,
    });
  };
  setupBasicPreviewCodeboard = (code) => {
    this.view = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: [...this.basicExtetion, EditorState.readOnly.of(true)],
      }),
      parent: this.ref,
    });
  };

  setupCollaborationCodeboard = () => {
    this.awareness = new awarenessProtocol.Awareness(this.ydoc);
    this.awareness.setLocalStateField("user", { name: this.username });
    this.socket.emit("join:board:room", { boardId: this.boardId });

    //sync
    this.socket.on("sync:board:room", (state) => {
      this.view = new EditorView({
        state: EditorState.create({
          doc: "",
          extensions: [
            ...this.basicExtetion,
            yCollab(this.yText, this.awareness, {
              undoManager: new Y.UndoManager(this.yText),
            }),
          ],
        }),
        parent: this.ref,
      });
      const decodedState = new Uint8Array(state);
      try {
        Y.applyUpdate(this.ydoc, decodedState);
      } catch (error) {
        console.error("Failed to apply update:", error);
      }
    });

    // Send local updates to the server
    this.ydoc.on("update", (update) => {
      console.log(this.boardId, "kkkkkkk");
      if (this.firstRender) {
        this.firstRender = false;
        return;
      }
      socket.emit("update:board:room", {
        boardId: this.boardId,
        update,
        userId: this.userId,
      });
    });

    this.socket.on("updated:board:room", (data) => {
      const { update } = data;
      const decodedState = new Uint8Array(update); // Ensure it's in Uint8Array format
      Y.applyUpdate(this.ydoc, decodedState);
    });

    this.yText.observe((update) => {
      console.log("share", this.yText.toString());
    });
  };

  destroy() {
    if (this.view) {
      this.view.destroy();
    }
    if (this.ydoc) {
      this.ydoc.destroy();
    }
  }
}

export default Codeboard;

// import * as Y from "yjs";
// import * as awarenessProtocol from "y-protocols/awareness";
// import { oneDark } from "@codemirror/theme-one-dark";

// import socket from "socketConfig";
// import {
//   autocompletion,
//   closeBrackets,
//   closeBracketsKeymap,
//   completionKeymap,
// } from "@codemirror/autocomplete";
// import { apiGateway } from "./apiGateway";
// import {
//   EditorView,
//   crosshairCursor,
//   drawSelection,
//   dropCursor,
//   highlightActiveLine,
//   highlightSpecialChars,
//   keymap,
//   rectangularSelection,
//   lineNumbers,
//   highlightActiveLineGutter,
// } from "@codemirror/view";

// import { EditorState } from "@codemirror/state";
// import { yCollab } from "y-codemirror.next";
// import { javascript } from "@codemirror/lang-javascript";
// import { python } from "@codemirror/lang-python";
// import { java } from "@codemirror/lang-java";
// import { cpp } from "@codemirror/lang-cpp";
// import { html } from "@codemirror/lang-html";
// import { css } from "@codemirror/lang-css";
// import { json } from "@codemirror/lang-json";
// import { go } from "@codemirror/lang-go";
// import { markdown } from "@codemirror/lang-markdown";

// import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
// import {
//   bracketMatching,
//   foldGutter,
//   foldKeymap,
//   indentOnInput,
// } from "@codemirror/language";

// import { lintKeymap } from "@codemirror/lint";
// import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
// const darkTheme = EditorView.theme(
//   {
//     "&": {
//       height: "100%",
//       backgroundColor: "#1f2125", // Background
//     },
//     ".cm-content": {
//       caretColor: "white", // Caret color
//     },
//     "&.cm-focused .cm-selectionBackground, ::selection": {
//       backgroundColor: "rgba(111, 86, 229, 0.2)", // Selection
//     },
//     ".cm-line": {
//       background: "transparent", // Line highlight
//     },
//     ".cm-gutters": {
//       backgroundColor: "#1f2125", // Gutter background
//       color: "#8a919966", // Gutter foreground
//     },
//     ".cm-activeLineGutter": {
//       backgroundColor: "transparent", // Active line gutter highlight
//     },
//   },
//   { dark: true } // Specify this is a dark theme
// );

// const EXTENSION_TO_LANGUAGE = {
//   js: "javascript",
//   ts: "typescript",
//   py: "python",
//   rb: "ruby",
//   php: "php",
//   java: "java",
//   cpp: "cpp",
//   cs: "csharp",
//   html: "html",
//   css: "css",
//   xml: "xml",
//   json: "json",
//   go: "go",
//   rs: "rust",
//   kt: "kotlin",
//   swift: "swift",
//   scala: "scala",
//   sql: "sql",
//   r: "r",
//   md: "markdown",
//   sh: "bash",
//   ps1: "powershell",
//   yaml: "yaml",
//   toml: "toml",
//   ini: "ini",
//   dart: "dart",
// };

// // this board is the genral codeboad for normal , preview and collaboration
// class Codeboard {
//   constructor({
//     instance,
//     username,
//     ref,
//     extension,
//     projectId,
//     filename,
//     userId,
//   }) {
//     this.instance = instance;
//     this.ref = ref;
//     this.ydoc = new Y.Doc();
//     this.awareness = null;
//     this.username = username;
//     this.yText = this.ydoc.getText("sharedText");
//     this.extension = extension;
//     this.socket = socket;
//     this.boardId = projectId + filename;
//     this.isUpdatingFromYText = true;
//     this.projectId = projectId;
//     this.filename = filename;
//     this.isDocumentReady = false;
//     this.userId = userId;
//     this.firstRender = false;

//     this.basicExtetion = [
//       lineNumbers(),
//       highlightActiveLineGutter(),
//       highlightSpecialChars(),
//       history(),
//       foldGutter(),
//       drawSelection(),
//       dropCursor(),
//       EditorState.allowMultipleSelections.of(true),
//       indentOnInput(),
//       oneDark,
//       bracketMatching(),
//       closeBrackets(),
//       autocompletion(),
//       rectangularSelection(),
//       crosshairCursor(),
//       darkTheme,
//       highlightActiveLine(),
//       highlightSelectionMatches(),
//       this.getLanguage(),
//       keymap.of([
//         ...closeBracketsKeymap,
//         ...defaultKeymap,
//         ...searchKeymap,
//         ...historyKeymap,
//         ...foldKeymap,
//         ...completionKeymap,
//         ...lintKeymap,
//       ]),
//     ];
//   }

//   getLanguage() {
//     switch (EXTENSION_TO_LANGUAGE[this.extension]) {
//       case "javascript":
//         return javascript();
//       case "typescript":
//         return javascript()();
//       case "python":
//         return python();
//       case "java":
//         return java();
//       case "cpp":
//         return cpp();
//       case "html":
//         return html();
//       case "css":
//         return css();
//       case "json":
//         return json();
//       case "go":
//         return go();
//       case "markdown":
//         return markdown();
//       default:
//         return markdown();
//     }
//   }

//   setupBasicCodeboard = (code) => {
//     this.view = new EditorView({
//       state: EditorState.create({
//         doc: code,
//         extensions: [...this.basicExtetion],
//       }),
//       parent: this.ref,
//     });
//   };
//   setupBasicPreviewCodeboard = (code) => {
//     this.view = new EditorView({
//       state: EditorState.create({
//         doc: code,
//         extensions: [...this.basicExtetion, EditorState.readOnly.of(true)],
//       }),
//       parent: this.ref,
//     });
//   };

//   setupCollaborationCodeboard = () => {
//     this.awareness = new awarenessProtocol.Awareness(this.ydoc);
//     this.awareness.setLocalStateField("user", { name: this.username });
//     console.log("run");
//     this.socket.emit("join:board:room", { boardId: this.boardId });

//     //sync
//     this.socket.on("sync:board:room", (state) => {
//       this.view = new EditorView({
//         state: EditorState.create({
//           doc: "",
//           extensions: [
//             ...this.basicExtetion,
//             yCollab(this.yText, this.awareness, {
//               undoManager: new Y.UndoManager(this.yText),
//             }),
//           ],
//         }),
//         parent: this.ref,
//       });
//       const decodedState = new Uint8Array(state);
//       try {
//         Y.applyUpdate(this.ydoc, decodedState);
//       } catch (error) {
//         console.error("Failed to apply update:", error);
//       }
//     });

//     // Send local updates to the server
//     this.ydoc.on("update", (update) => {
//       socket.emit("update:board:room", {
//         boardId: this.boardId,
//         update,
//         userId: this.userId,
//       });
//     });

//     this.socket.on("updated:board:room", (data) => {
//       const { update } = data;
//       const decodedState = new Uint8Array(update); // Ensure it's in Uint8Array format
//       Y.applyUpdate(this.ydoc, decodedState);
//     });
//   };

//   destroy() {
//     if (this.view) {
//       this.view.destroy();
//     }
//     if (this.ydoc) {
//       this.ydoc.destroy();
//     }
//   }
// }

// export default Codeboard;
