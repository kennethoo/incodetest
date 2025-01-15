import { useEffect, useState } from "react";
import styled from "styled-components";
import data from "testdata/codeBlock";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import useUser from "hooks/useUser";
import LoadingSpin from "Components/Loadingspin";
// create some stuff
const HomeContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  height: 100dvh;
  overflow: scroll;
  padding: 100px;
`;
const Box = styled.div`
  padding: 10px;
  width: 100%;
  margin: 0 auto;
  border: 2px solid var(--main-bg-cool-rgb);
  border-radius: 10px;
  color: var(--text);
  text-align: center;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Test = (): JSX.Element => {
  return (
    <HomeContainer>
      {data.map((item, index) => {
        return <Row key={index} data={item} />;
      })}
    </HomeContainer>
  );
};

function Row({ data }) {
  const [output, setOuput] = useState(null);
  const { language, code } = data;
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      const { result } = await apiGateway.runCode({
        userId: user.userId,
        language,
        code,
        saveMetric: false,
        projectId: null,
      });
      const { output } = result;
      setOuput(output);
    };

    fetchData();
  }, []);

  return <Box>Result: {output !== null ? output : <LoadingSpin />}</Box>;
}

export default Test;
