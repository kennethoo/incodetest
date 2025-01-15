import profile from "profile.webp";
import useUserInfo from "hooks/useUserInfo";
import styled from "styled-components";
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
interface IconProfileProps {
  userId: string;
}
function IconProfile({ userId }: IconProfileProps) {
  const defaultIcon =
    "https://meettumdev.s3.us-east-2.amazonaws.com/profile.7a6a6c54279a54d1977c.webp";
  const { userInfo, isLoading } = useUserInfo({ userId });
  const profileUrl = userInfo?.profile ? userInfo?.profile : defaultIcon;
  return (
    <Container>
      {!isLoading && (
        <img alt={userInfo?.username} src={profileUrl} loading="lazy" />
      )}
    </Container>
  );
}

export default IconProfile;
