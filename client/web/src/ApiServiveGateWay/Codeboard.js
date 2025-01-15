import * as Y from "yjs";
import * as awarenessProtocol from "y-protocols/awareness";
import { oneDark } from "@codemirror/theme-one-dark";
import realtimeBoardSocket from "realtimeBoardSocket";
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
    this.yText = this.ydoc.getText(instance);
    this.extension = extension;
    this.realtimeBoardSocket = realtimeBoardSocket;
    this.isUpdatingFromYText = true;
    this.projectId = projectId;
    this.filename = filename;
    this.isDocumentReady = false;
    this.userId = userId;
    this.firstRender = true;
    this.called = false;

    this.JAVASCRIPT_CODE_TEMPLATE = `
    // A simple function to greet a user
  function greet(name) {
      if (!name) {
          console.log("Hello, Guest!");
      } else {
          console.log("Hello, " + name + "!");
      }
  }

  // Call the function with a sample name
  greet("Bob");
  
  // Example of array manipulation
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2);
  console.log("Doubled Numbers:", doubled);

  // An object with a method
  const user = {
      name: "Bob",
      age: 26,
      introduce() {
          console.log(\`Hi, I'm \${this.name} and I'm \${this.age} years old.\`);
      }
  };

  // Call the method
  user.introduce();`;

    this.PYTHON_CODE_TEMPLATE = `
   # A simple function to greet a user
def greet(name=None):
    if not name:
        print("Hello, Guest!")
    else:
        print(f"Hello, {name}!")

# Call the function with a sample name
greet("Bob")

# Example of list manipulation
numbers = [1, 2, 3, 4, 5]
doubled = [num * 2 for num in numbers]
print("Doubled Numbers:", doubled)

# A class with a method
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hi, I'm {self.name} and I'm {self.age} years old.")

# Create an instance of the class and call the method
user = User("Bob", 26)
user.introduce()
   `;

    this.JAVA_CODE_TEMPLATE = `
     public class Main {
    // A simple method to greet a user
    public static void greet(String name) {
        if (name == null || name.isEmpty()) {
            System.out.println("Hello, Guest!");
        } else {
            System.out.println("Hello, " + name + "!");
        }
    }

    public static void main(String[] args) {
        // Call the method with a sample name
        greet("Bob");

        // Example of array manipulation
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Doubled Numbers: ");
        for (int number : numbers) {
            System.out.print((number * 2) + " ");
        }
        System.out.println();

        // Create an instance of a user and introduce
        User user = new User("Bob", 26);
        user.introduce();
    }
}

// A User class with a method
class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void introduce() {
        System.out.println("Hi, I'm " + name + " and I'm " + age + " years old.");
    }
}
     `;

    this.GO_CODE_TEMPLATE = `
      
      package main

import (
	"fmt"
)

// A simple function to greet a user
func greet(name string) {
	if name == "" {
		fmt.Println("Hello, Guest!")
	} else {
		fmt.Println("Hello, " + name + "!")
	}
}

// A struct representing a user
type User struct {
	Name string
	Age  int
}

// A method to introduce the user
func (u User) Introduce() {
	fmt.Printf("Hi, I'm %s and I'm %d years old.\n", u.Name, u.Age)
}

func main() {
	// Call the greet function
	greet("Bob")

	// Example of slice manipulation
	numbers := []int{1, 2, 3, 4, 5}
	fmt.Print("Doubled Numbers: ")
	for _, num := range numbers {
		fmt.Printf("%d ", num*2)
	}
	fmt.Println()

	// Create an instance of User and call the method
	user := User{Name: "Bob", Age: 26}
	user.Introduce()
}
      `;

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
      darkTheme,
      oneDark,
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
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

  getTemplate() {
    switch (EXTENSION_TO_LANGUAGE[this.extension]) {
      case "javascript":
        return this.JAVASCRIPT_CODE_TEMPLATE;
      case "typescript":
        return this.JAVASCRIPT_CODE_TEMPLATE;
      case "python":
        return this.PYTHON_CODE_TEMPLATE;
      case "java":
        return "";
      case "cpp":
        return "";
      case "html":
        return "";
      case "css":
        return "";
      case "json":
        return "";
      case "go":
        return this.GO_CODE_TEMPLATE;
      case "markdown":
        return "";
      default:
        return "";
    }
  }

  setupBasicCodeboard = (code) => {
    const defaultCode = this.getTemplate();

    const codeToShow = code ? code : defaultCode;

    this.yText.delete(0, this.yText.length); // Clear previous content
    this.yText.insert(0, codeToShow); // In
    this.view = new EditorView({
      state: EditorState.create({
        doc: this.yText.toString(),
        extensions: [
          ...this.basicExtetion,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const changes = update.changes;
              changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
                this.yText.delete(fromA, toA - fromA);
                this.yText.insert(fromB, inserted.toString());
              });
            }
          }),
        ],
      }),
      parent: this.ref,
    });

    this.timer = setTimeout(() => {
      this.yText.delete(0, this.yText.length); // Clear any previous content Insert new code
      this.yText.insert(0, codeToShow); // Insert new code
    }, 100);
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

  setupCollaborationCodeboard = (value) => {
    if (this.called) {
      return;
    }
    this.called = true;
    this.awareness = new awarenessProtocol.Awareness(this.ydoc);
    this.awareness.setLocalStateField("user", {
      name: this.username,
      color: "red",
    });
    // this.realtimeBoardSocket.connect();
    this.realtimeBoardSocket.emit("join:board:room", { boardId: this.boardId });

    // this.awareness.on("change", (changes, awareness) => {
    //   const states = [...this.awareness.getStates()];
    //   states.forEach((item) => {
    //     const [id, state] = item;

    //     if (state.cursor) {
    //       const { position, username } = state.cursor;

    //       // You can update the UI here with the cursor position.
    //       // For example, you can highlight the other user's cursor in the editor.
    //       // Example:
    //       console.log(`${username}'s cursor is at position ${position}`);

    //       // Here you can implement custom logic to draw the other user's cursor at `position` on your editor view.
    //     }
    //   });
    // });

    if (value.length) {
      this.firstRender = false;
    }
    //sync
    this.realtimeBoardSocket.on("sync:board:room", (result) => {
      const { state, isNew } = result;
      this.view = new EditorView({
        state: EditorState.create({
          doc: "",
          extensions: [
            ...this.basicExtetion,
            yCollab(this.yText, this.awareness, {
              undoManager: new Y.UndoManager(this.yText),
            }),

            /// for curoirt

            // EditorView.updateListener.of((update) => {
            //   if (update.docChanged || update.selectionSet) {
            //     const cursorPosition = update.state.selection.main.head; // Current cursor position
            //     const selectionStart = update.state.selection.main.from; // Start of the selection
            //     const selectionEnd = update.state.selection.main.to; // End of the selection
            //     this.sendCursorPosition({
            //       cursorPosition,
            //       selectionStart,
            //       selectionEnd,
            //     });

            //     this.awareness.setLocalStateField("cursor", {
            //       position: cursorPosition,
            //       username: this.username,
            //       userId: this.userId,
            //     });
            //   }
            // }),
          ],
        }),
        parent: this.ref,
      });
      const decodedState = new Uint8Array(state);
      if (isNew) {
        this.firstRender = false;
      }
      try {
        Y.applyUpdate(this.ydoc, decodedState);
      } catch (error) {
        console.error("Failed to apply update:", error);
      }
    });

    // Send local updates to the server
    this.ydoc.on("update", (update) => {
      if (this.firstRender && this.yText.toString().trim().length > 0) {
        this.firstRender = false;
        return;
      }

      this.firstRender = false;

      realtimeBoardSocket.emit("update:board:room", {
        boardId: this.boardId,
        update,
        userId: this.userId,
      });
    });

    this.realtimeBoardSocket.on("updated:board:room", (data) => {
      const { update, boardId } = data;
      if (boardId !== this.boardId) {
        return;
      }
      const decodedState = new Uint8Array(update); // Ensure it's in Uint8Array format
      Y.applyUpdate(this.ydoc, decodedState);
    });

    //recerive cursort update
    // this.realtimeBoardSocket.on("updated:cursor", (data) => {
    //   const { update } = data;
    //   const { cursorPosition, userId, username, selectionStart, selectionEnd } =
    //     update;

    //   this.awareness.setLocalStateField("cursor", {
    //     position: cursorPosition,
    //     username: username,
    //     userId: userId,
    //     selection: { selectionStart, selectionEnd }, // Added selection data
    //   });
    //   // Update the awareness state with the cursor of the remote user
    // });
  };

  sendCursorPosition(cursorPosition) {
    const cursorData = {
      boardId: this.boardId,
      update: {
        userId: this.userId,
        username: this.username,
        ...cursorPosition,
      },
    };
    this.realtimeBoardSocket.emit("update:cursor", cursorData);
  }

  destroy() {
    if (this.view) {
      this.view.destroy();
    }
    if (this.ydoc) {
      this.ydoc.destroy();
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.realtimeBoardSocket.off("updated:board:room");
    this.realtimeBoardSocket.off("sync:board:room");
  }
}

export default Codeboard;
