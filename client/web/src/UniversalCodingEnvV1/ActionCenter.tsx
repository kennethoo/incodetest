import { Link } from "react-router-dom";
import styled from "styled-components";
import LogUserInfo from "Components/LogUserInfo";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import useUser from "hooks/useUser";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "Components/shared/DropDownMenu";
import BackButton from "Components/shared/BackButton";
import { VscNewFile } from "react-icons/vsc";
import { VscNewFolder } from "react-icons/vsc";
import { RiFileEditLine } from "react-icons/ri";
import { CiLink } from "react-icons/ci";
import useLogger from "hooks/useLogger";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  position: relative;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  width: 100%;
  padding-left: 10px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const LinkSection = styled.div`
  display: flex;
  gap: 5px;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const Title = styled.div`
  display: -webkit-box;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  color: var(--text);
`;

const ButtonContainer = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;
function ActionCenter({
  codeWorkSession,
  setIscreateNewFileModalOpen,
  setIsModalOpen,
  setIsDeledModal,
  isEndSessionModal,
  setIsEndSessionModal,
}) {
  const ACTIVE_SESSION = "active_session";
  const { user } = useUser();
  const logger = useLogger();
  const isAuthor = codeWorkSession?.creatorId === user.userId;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      logger({
        isErrorMessage: false,
        message: "Link successfully copied",
        fileName: "ProjectActionButton.tsx",
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const getDroptdownMenuForProject = () => {};
  const getDroptdownMenuForSession = () => {
    return [
      {
        item: "End Session",
        handleClick: () => {
          setIsEndSessionModal(true);
        },
      },
    ];
  };
  const getDroptdownMenu = () => {
    if (codeWorkSession.isProject) {
      return getDroptdownMenuForProject();
    } else {
      return getDroptdownMenuForSession();
    }
  };

  const isActive = codeWorkSession.sessionState === ACTIVE_SESSION;
  return (
    <Container>
      <ButtonContainer
        onClick={() => {
          setIscreateNewFileModalOpen(true);
        }}>
        <VscNewFile />
      </ButtonContainer>
      <ButtonContainer
        onClick={() => {
          setIsModalOpen(true);
        }}>
        <RiFileEditLine />
      </ButtonContainer>
      <ButtonContainer onClick={copyLink}>
        <CiLink />
      </ButtonContainer>

      {isAuthor && isActive && (
        <LinkSection>
          <DropDownMenu options={getDroptdownMenu()} />
        </LinkSection>
      )}
    </Container>
  );
}

export default ActionCenter;
