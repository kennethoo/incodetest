const files = [{ filename: "script.js", code: "console.log('Hello wolrd')" }];

import executeEngineManagerv2 from "../engine-application/executeEngineManagerv2.js";

//start the test

async function start() {
  const result = await executeEngineManagerv2.execute(
    files,
    executeEngineManagerv2.JAVASCRIPT,
  );

  console.log(result);
}

export default start;
