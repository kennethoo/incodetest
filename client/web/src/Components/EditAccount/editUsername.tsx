import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import useUser from "hooks/useUser";
import UserMannager from "ApiServiveGateWay/userMannager";
import profile from "profile.webp";
import LoadingSpin from "Components/Loadingspin";
import { useDispatch } from "react-redux";

function EditUsername() {
  const { user } = useUser();
  return (
    <div className="edit-box-profile">
      <label htmlFor="username">Username</label>
      <input
        className="username-profile"
        type="text"
        name="username"
        value={user.username}
      />
    </div>
  );
}
export default EditUsername;
