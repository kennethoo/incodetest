import { useSelector, useDispatch } from "react-redux";
import DeleteAccountConfirmation from "modals/DeleteAccountConfirmation";
function ModalWraper() {
  const dispatch = useDispatch();
  const modalId = useSelector((state: { modalId: string }) => state.modalId);
  const modalValue = useSelector((state: any) => state.modalValue);
  const closeModal = () => {
    dispatch({
      type: "UPDATE_MODAL_VALUE",
      value: { modalId: null, modalValue: null },
    });
  };
  if (!modalId) return <></>;
  return (
    <div className="wrapModal">
      {modalId === "DeleteAccountConfirmation" && (
        <DeleteAccountConfirmation closeModal={closeModal} />
      )}
    </div>
  );
}
export default ModalWraper;
