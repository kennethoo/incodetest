import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import useUser from "hooks/useUser";
import UserMannager from "ApiServiveGateWay/userMannager";
import profile from "profile.webp";
import LoadingSpin from "Components/Loadingspin";
import { useDispatch } from "react-redux";

function EditProfileImage() {
  const { user } = useUser();
  const userMannager = new UserMannager(user?.userId);
  const [previewsIcon, setPreviewsIcon] = useState(user.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadProfileImage = async (event) => {
    setLoading(true);
    const file = event.target.files;
    if (file[0].type.includes("image")) {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("userId", user.userId);
      const { data } = await userMannager.uploadUserProfile(formData);
      const { succeeded, profileUrl } = data;
      if (succeeded) {
        setLoading(false);
        setPreviewsIcon(profileUrl);
        const newProfileDetails = { ...user, profile: profileUrl };
        dispatch({ type: "UPDATE_USER", value: newProfileDetails });
      }
    }
  };
  const removeProfileImage = async () => {
    setLoading(true);
    await userMannager.removeUserProfile();
    setLoading(false);
    setPreviewsIcon("");
    const newProfileDetails = { ...user, profile: "" };
    dispatch({ type: "UPDATE_USER", value: newProfileDetails });
  };

  if (loading) {
    return (
      <div className="user-profile-container">
        <LoadingSpin />
      </div>
    );
  }
  return (
    <div className="user-profile-container">
      {previewsIcon && (
        <div className="edit0buttoor center ">
          <button onClick={removeProfileImage}>
            <AiFillDelete />
          </button>
        </div>
      )}
      {!previewsIcon && (
        <div className="edit0buttoor center ">
          <button>
            <label htmlFor="file-profilee">
              <MdModeEdit />
            </label>
          </button>
          <input
            onChange={uploadProfileImage}
            id="file-profilee"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      )}
      <div className="holf-the-iconf">
        {previewsIcon && (
          <img
            style={{ borderRadius: "50%" }}
            alt=""
            src={previewsIcon}
            loading="lazy"
          />
        )}
        {!previewsIcon && (
          <img
            alt=""
            style={{ borderRadius: "50%" }}
            src={profile}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

export default EditProfileImage;
