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
  codeWorkSessionId,
  canUpdate,
  codeWorkSessionApiRef,
  isReadOnly,
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
    if (canUpdate) {
      codeWorkSessionApiRef.updateFile({
        id: codeWorkSessionId,
        filename,
        newCode: debouceFile,
      });
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
      projectId: codeWorkSessionId,
      filename,
      userId: user.userId,
    });

    if (isReadOnly) {
      codebaord.current.setupBasicPreviewCodeboard(value);
    } else {
      codebaord.current.setupCollaborationCodeboard(value);
    }

    codebaord.current.ydoc.on("update", (update) => {
      onChange(codebaord.current.yText.toString());
    });
    return () => {
      codebaord.current.destroy();
    };
  }, [fileId, filename, user.userId, user.username]);

  return (
    <Container ref={codeSectionRef}>
      {isMeetcode && <Markdown text={value} />}
    </Container>
  );
};

export default CodeFileWrapper;
