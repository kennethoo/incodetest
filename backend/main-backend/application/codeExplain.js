import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

class CodeExplain {
  constructor() {
    this.MAKE_CODE_BETTER = "make_code_better";
    this.EXPLAIN_CODE_ERROR = "explain_code_error";
    this.EXPLAIN_CODE = "explain_code";
    this.validAction = [
      this.MAKE_CODE_BETTER,
      this.EXPLAIN_CODE_ERROR,
      this.EXPLAIN_CODE,
    ];
  }

  handleCodeExplanation = async ({ code, action, errorMessage, language }) => {
    if (!this.validAction.includes(action)) {
      return { succeeded: false, errorMessage: "wtf are your doing " };
    }
    const promp = this.buildPromp({ code, action, errorMessage, language });
    return await this.askAi(promp);
  };

  buildPromp({ code, action, errorMessage, language }) {
    if (action === this.MAKE_CODE_BETTER) {
      return (
        `Hi so you see i am working on this code  ` +
        code +
        "and i would like to know how can i make it cleaner , simple and more effecient , keep it simple and sweet and if you see a comment or question that is not related to code please do not enternainnt that conversation and tell the user to focus on code" +
        ` in ${language}`
      );
    } else if (action === this.EXPLAIN_CODE_ERROR) {
      return (
        "Hi so you see i am working on this code " +
        code +
        +"and i am receiving the following errror" +
        errorMessage +
        "can you please clearly expain what that error mean first and what i need to do to fix it,  keep it simple and sweet and if you see a comment or question that is not related to code please do not enternainnt that conversation and tell the user to focus on code"
      );
    } else if (action === this.EXPLAIN_CODE) {
      return (
        "Hi so you see i am working on this code " +
        code +
        "can you please clealy expain to me each part of this code and what it is trying to do ,  keep it simple and sweet and if you see a comment or question that is not related to code please do not enternainnt that conversation and tell the user to focus on code "
      );
    }
  }

  askAi = (prompt) => {
    return new Promise(async (resolve) => {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: prompt }],
          model: "gpt-4o-mini",
        });
        const answer = completion.choices[0];
        resolve({
          succeeded: true,
          result: answer.message.content,
        });
      } catch (error) {
        resolve({
          succeeded: false,
          errorMessage: "Something went wrong try later",
        });
      }
    });
  };
}

const codeExplain = new CodeExplain();

export default codeExplain;
