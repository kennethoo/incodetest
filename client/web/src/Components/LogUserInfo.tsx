import styled from "styled-components";
import profile from "profile.webp";
import useUser from "hooks/useUser";

// Styled Components
const WrapperBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: center;

  @media only screen and (max-width: 400px) {
    display: none;
  }
`;

const InfoProfile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Description = styled.div`
  margin-left: 10px;
`;

const Username = styled.p`
  font-weight: bold;
  color: var(--text);
`;

const FullName = styled.p`
  color: gray;
  color: var(--text);
`;

const LogUserInfo = () => {
  const { user } = useUser();

  console.log(user?.profile);

  return (
    <WrapperBox>
      <InfoProfile>
        <ProfilePicture
          alt={user?.username}
          src={user?.profile?.length > 0 ? user?.profile : profile}
          loading="lazy"
        />
        <Description>
          <Username>{user?.username}</Username>
          <FullName>{user?.fullName}</FullName>
        </Description>
      </InfoProfile>
    </WrapperBox>
  );
};

export default LogUserInfo;
