import { useDispatch } from "react-redux";
function DeleteAccount() {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: "UPDATE_MODAL_VALUE",
      value: { modalId: "DeleteAccountConfirmation", modalValue: null },
    });
  };
  return (
    <div
      style={{
        backgroundColor: "transparent",
      }}
      className="add-collection-tolistt"
    >
      <button
        onClick={closeModal}
        style={{
          cursor: "pointer",
          backgroundColor: "transparent",
          color: "#C0392B",
          borderRadius: "40px",
          paddingLeft: "50px",
          textAlign: "start",
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccount;
