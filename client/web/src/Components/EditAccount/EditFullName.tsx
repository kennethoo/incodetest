import { useState, useEffect } from "react";
import useDebounce from "hooks/useDebounce";
import useUser from "hooks/useUser";
import UserMannager from "ApiServiveGateWay/userMannager";
import { useDispatch } from "react-redux";

function EditFullName() {
  const { user } = useUser();
  const { fullName } = user;
  const dispatch = useDispatch();
  const userMannager = new UserMannager(user?.userId);
  const [newValue, setNewValue] = useState(fullName);
  const debounceValue = useDebounce(newValue, 100);
  const placeholder = "Enter your full name";

  const handleBio = (e: any) => {
    setNewValue(e.target.value);
  };

  useEffect(() => {
    const newProfileDetails = { ...user, fullName: debounceValue };
    userMannager.updateUserProfile(newProfileDetails);
    dispatch({ type: "UPDATE_USER", value: newProfileDetails });
  }, [debounceValue]);
  return (
    <div className="edit-box-profile">
      <p>Full name</p>
      <input
        onChange={handleBio}
        type="text"
        value={newValue}
        placeholder={placeholder}
      />
    </div>
  );
}
export default EditFullName;
