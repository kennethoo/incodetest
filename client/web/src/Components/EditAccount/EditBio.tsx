import { useState, useEffect } from "react";
import useDebounce from "hooks/useDebounce";
import useUser from "hooks/useUser";
import UserMannager from "ApiServiveGateWay/userMannager";
import { useDispatch } from "react-redux";
import Editable from "Components/shared/Editable";

function EditBio() {
  const { user } = useUser();
  const { bio } = user;
  const dispatch = useDispatch();
  const userMannager = new UserMannager(user?.userId);
  const [newValue, setNewValue] = useState(bio);
  const debounceValue = useDebounce(newValue, 100);
  const placeholder = "Add a bio";

  useEffect(() => {
    const newProfileDetails = { ...user, bio: debounceValue };
    userMannager.updateUserProfile(newProfileDetails);
    dispatch({ type: "UPDATE_USER", value: newProfileDetails });
  }, [debounceValue]);
  return (
    <div className="edit-box-profile">
      <p>Bio</p>
      <div style={{ padding: "10px" }}>
        <Editable
          placeholder={placeholder}
          handleBio={setNewValue}
          value={newValue}
        />
      </div>
    </div>
  );
}

export default EditBio;
