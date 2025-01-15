import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import useEditorTheme from "hooks/codeEngine/useEditorTheme";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import Codeboard from "ApiServiveGateWay/Codeboard";
import CollaborativeCodeEditor from "Components/PlaygroundV2/CollaborativeCodeEditor";
import LanguageDisplayer from "Components/LanguageDisplayer";
import useUser from "hooks/useUser";
import FileTabs from "Components/PlaygroundV2/FileTabs";
import useDebounce from "hooks/useDebounce";
import Markdown from "Components/shared/Markdown";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const CodeFileWrapper = ({
  language,
  value,
  filename,
  updateProjectProfile,
  isEntryPoint,
  fileId,
  projectId,
  canUpdate,
}): JSX.Element => {
  const { user } = useUser();
  const codeSectionRef = useRef();
  const codebaord = useRef(null);
  const [codeValue, setCodeValue] = useState(value);
  const onChange = React.useCallback((val) => {
    updateProjectProfile({ filename, code: val, isEntryPoint });
    setCodeValue(val);
  }, []);

  const debouceFile = useDebounce(codeValue, 1000);

  useEffect(() => {
    const payload = {
      action: apiGateway.UPDATE_PROJECT_EXISTING_FILE,
      payload: {
        _id: projectId,
        filename,
        newCode: debouceFile,
      },
    };
    if (canUpdate) {
      apiGateway.handleActionForProject(payload);
    }
  }, [debouceFile]);

  const extension = filename.split(".").pop();

  const isMeetcode = extension === "meetcode";

  useEffect(() => {
    const extension = filename.split(".").pop();
    codebaord.current = new Codeboard({
      instance: fileId,
      username: user.username,
      ref: codeSectionRef.current,
      extension,
      projectId,
      filename,
      userId: user.userId,
    });

    if (extension !== "meetcode") {
      codebaord.current.setupCollaborationCodeboard(value);
    }
    codebaord.current.ydoc.on("update", (update) => {
      onChange(codebaord.current.yText.toString());
    });
    return () => {
      codebaord.current.destroy();
    };
  }, []);

  return (
    <Container ref={codeSectionRef}>
      {isMeetcode && <Markdown text={value} />}
    </Container>
  );
};

export default CodeFileWrapper;
