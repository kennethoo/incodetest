import useUserInfo from "hooks/useUserInfo";

const Username = ({ userId, forceName = "" }) => {
  const link = true;
  const { userInfo } = useUserInfo({ userId });
  const name = forceName ? forceName : userInfo?.username;

  return (
    <div className="usernsmr-the-compoocnf">
      {userInfo !== null ? (
        link ? (
          <div className="srjhsur">
            <div className="rnwjrkwr">{name}</div>
          </div>
        ) : (
          <p>{name}</p>
        )
      ) : (
        <div className="uisiiirjr"></div>
      )}
    </div>
  );
};

export default Username;
