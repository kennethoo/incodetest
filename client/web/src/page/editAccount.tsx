import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";

import EditProfileImage from "Components/EditAccount/EditProfileImage";
import EditFullName from "Components/EditAccount/EditFullName";
import EditUsername from "Components/EditAccount/editUsername";

function Edit() {
  const { user } = useUser();
  const navigate = useNavigate();

  const goBack = (e) => {
    navigate(-1);
  };

  return (
    <div className="box-profile-eidt">
      <div className="box-generelfunction-edit">
        <div className="tabs-edit-naviagation">
          <div className="title-edit">
            <div className="before-edit">
              <div onClick={goBack} className="close-that">
                <BiArrowBack />
              </div>
              <p>Edit Profile</p>
            </div>
          </div>
          <div className="edit">
            <EditProfileImage />
            <div className="form">
              <EditFullName />
              <EditUsername />

              <div className="edit-box-profile">
                <p>Email</p>
                <input
                  className="email-profile"
                  type="text"
                  name="email"
                  placeholder={user?.email}
                  value={user?.email}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
