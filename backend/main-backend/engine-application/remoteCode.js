export class RemoteEnginerMannager {
  constructor() {
    this.JAVASCRIPT = "javascript";
    this.PYTHON = "python";
    this.GO = "go";
    this.JAVA = "java";
    this.CPP = "cpp";
    this.RUBY = "ruby";
    this.HTML = "html";
    this.MEETTUM_NODE_IMAGE = "amzat/meettum-node-image:v1.0";
    this.MEETTUM_PYTHON_IMAGE = "amzat/meettum-python-image:v1.0";
    this.MEETTUM_JAVA_IMAGE = "amzat/meettum-java-image";
    this.MEETTUM_GOLANG = "amzat/meettum-go-image";
    this.MEETTUM_CPP = "amzat/meettum-cpp-image";
    this.MEETTUM_RUBY = "amzat/meettum-ruby-image";

    this.supportedLanGuage = [
      this.JAVASCRIPT,
      this.JAVA,
      this.PYTHON,
      this.GO,
      this.RUBY,
      this.CPP,
    ];
  }

  isSuportedLanguage(language) {
    return this.supportedLanGuage.includes(language);
  }

  getDefaultFile = (language) => {
    if (language == remoteCode.JAVASCRIPT) {
      return [
        {
          filename: "main.js",
          code: "console.log('Hello wolrd')",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.PYTHON) {
      return [
        {
          filename: "main.py",
          code: "print('hello world')",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.JAVA) {
      return [
        {
          filename: "Main.java",
          code: "",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.GO) {
      return [
        {
          filename: "main.go",
          code: "",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.HTML) {
      return [
        {
          filename: "index.html",
          code: "",
          isEntryPoint: true,
        },
        {
          filename: "style.css",
          code: "",
          isEntryPoint: false,
        },
        {
          filename: "index.js",
          code: "",
          isEntryPoint: false,
        },
      ];
    } else {
      return [];
    }
  };
}

export const remoteCode = new RemoteEnginerMannager();
