import styled from "styled-components";
import IconProfile from "Components/IconProfile";
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const Username = styled.div`
  color: var(--text);
  font-weight: bold;
  text-transform: capitalize;
`;
const AvatarSection = styled.div`
  width: 50px;
`;
const MessageContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% - 50px);
`;
const IconImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  overflow: hidden;
`;
const Message = styled.div`
  color: var(--text);
  text-align: justify;
`;
function ChatMessage({ chat }) {
  return (
    <Container>
      <AvatarSection>
        <IconImage>
          <IconProfile userId={chat.userId} />
        </IconImage>
      </AvatarSection>
      <MessageContainer>
        <Username>{chat.username}</Username>
        <Message>{chat.content}</Message>
      </MessageContainer>
    </Container>
  );
}

export default ChatMessage;
