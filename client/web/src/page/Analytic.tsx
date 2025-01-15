import { useEffect, useState } from "react";
import styled from "styled-components";
import IconProfile from "Components/IconProfile";
import { useAnalitic } from "hooks/useAnalitic";
import BackButton from "Components/shared/BackButton";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import LanguageDisplayern from "Components/LanguageDisplayer";
import formatSeconds from "utility/formatSeconds";
import { InView } from "react-intersection-observer";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;
const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow: scroll;
`;
const Title = styled.p`
  font-size: 20px;
  color: var(--text);
`;
const SectionRow = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;
const MoreButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  background-color: var(--main-bg-cool-rgb);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 20px;
  border: 0;
`;
const CelBox = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
  height: 60px;
  color: var(--text);
  border-left: 1px solid var(--main-bg-cool-rgb);
  justify-content: center;
  padding: 10px;
`;
const Output = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-height: 60px; /* Set to the parent container height */
  line-height: 1.5em; /* Set your preferred line-height */
`;

const TableLogsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--main-bg-cool-rgb);
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 20px;
`;

const TableHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--text);

  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
  border: 0;
  text-transform: capitalize;
  border-radius: 30px;
`;

const SectionRowItem = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  cursor: pointer;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

const SimpleWraper = styled.div``;

const Actions = styled.div`
  text-align: center;
`;
const Button = styled.button`
  background-color: #6f56e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  margin: 10px;
`;
function Analytic() {
  const [isLoadingMore, setIsloadingMore] = useState(false);
  const [allLogs, seAllLogs] = useState([]);

  const { logs, canFetch, pagination, refetch } = useAnalitic();
  const navigate = useNavigate();

  const loadMore = () => {
    if (canFetch && !isLoadingMore) {
      setIsloadingMore(true);
      const updatedSkip = pagination.limit + pagination.skip;
      loadPreviousLogs(updatedSkip);
    }
  };

  const loadPreviousLogs = async (updatedSkip) => {
    const result = await refetch(pagination.limit, updatedSkip);
    seAllLogs((prev) => {
      return [...prev, ...result];
    });
    setIsloadingMore(false);
  };

  useEffect(() => {
    seAllLogs(logs);
  }, [logs]);
  const renderRow = ({
    _id,
    language,
    memoryUsage,
    duration,
    cpuUsage,
    statusColor,
    runTimeStatus,
  }) => {
    return (
      <SectionRowItem
        onClick={() => {
          navigate(`/app/execution/${_id}`);
        }}
        key={_id}
      >
        <CelBox style={{ borderLeft: 0 }}>
          <LanguageDisplayern language={language} />
        </CelBox>

        <CelBox>
          {formatSeconds(
            parseFloat(parseFloat(formatSeconds(duration)).toFixed(2)),
          )}
        </CelBox>

        <CelBox>{memoryUsage}</CelBox>
        <CelBox>{cpuUsage}</CelBox>

        <CelBox>
          <Status
            style={{
              color: statusColor.color,
              backgroundColor: statusColor.backgroundColor,
            }}
          >
            {runTimeStatus}
          </Status>
        </CelBox>
      </SectionRowItem>
    );
  };
  return (
    <Container>
      <Header>
        <BackButton />
        <Title>Analytics</Title>
      </Header>
      <TableLogsContainer>
        <TableHeader>
          <Title>All Execution</Title>
        </TableHeader>
        <TableContainer>
          <SectionRow
            style={{
              backgroundColor: "var(--main-bg-cool-rgb)",
            }}
          >
            <CelBox style={{ borderLeft: 0, height: "50px" }}>Language</CelBox>
            <CelBox style={{ height: "50px" }}>Duration</CelBox>

            <CelBox style={{ height: "50px" }}>Memory</CelBox>
            <CelBox style={{ height: "50px" }}>CPU Time</CelBox>
            <CelBox style={{ height: "50px" }} onClick={() => {}}>
              Status
            </CelBox>
          </SectionRow>

          {allLogs.map((item, index) => {
            const isBottomMost = index === allLogs.length - 1;

            const {
              _id,

              runTimeStatus,
            } = item;

            const statusColor =
              runTimeStatus === "succeeded"
                ? { backgroundColor: "rgba(76,175,80,0.3)", color: "#4caf50" }
                : { backgroundColor: "rgba(100, 0, 0,0.3)", color: "red" };

            if (isBottomMost) {
              return (
                <InView key={_id}>{renderRow({ ...item, statusColor })}</InView>
              );
            } else {
              return (
                <SimpleWraper key={_id}>
                  {renderRow({ ...item, statusColor })}
                </SimpleWraper>
              );
            }
          })}
        </TableContainer>

        {canFetch && (
          <Actions>
            <Button onClick={loadMore}>Load More</Button>
          </Actions>
        )}
      </TableLogsContainer>
    </Container>
  );
}

export default Analytic;
