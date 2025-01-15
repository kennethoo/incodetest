import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import styled from "styled-components";

import useUserInfo from "hooks/useUserInfo";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AvatarContainer({ users }) {
  return (
    <Container>
      {!!users.length && (
        <AvatarGroup
          sx={{
            display: "flex",
            alignItems: "center",
            "& .MuiAvatar-root": {
              width: "25px", // Adjust individual avatar size
              height: "25px", // Match the avatar size
              fontSize: "12px", // Adjust the font size inside avatars
            },
            "& .MuiAvatarGroup-avatar": {
              backgroundColor: "#ccc", // Customize surplus avatar background
              color: "#fff", // Customize surplus avatar text color
              width: "25px", // Match size with other avatars
              height: "25px",
              fontSize: "12px", // Match font size
            },
          }}
          max={3}
          renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
          total={users.length}>
          {users.map((user) => {
            return (
              <AvatarUser
                userId={user.userId}
                username={user.username}
                key={user.socketId}
              />
            );
          })}
        </AvatarGroup>
      )}
    </Container>
  );
}

function AvatarUser({ userId, username }) {
  const { userInfo } = useUserInfo({ userId });
  return (
    <Avatar
      style={{
        width: "25px",
        height: "25px",
        border: "0",
        boxShadow: "0px 0px 10px #000",
        textTransform: "capitalize",
      }}
      alt={username}
      src={
        userInfo?.profile.length
          ? userInfo?.profile
          : "/static/images/avatar/1.jpg"
      }
    />
  );
}
export default AvatarContainer;
