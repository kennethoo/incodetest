import { BsChatFill } from "react-icons/bs";

function FeedBackButton() {
  return (
    <div style={{ marginTop: "20px" }} className={`box-that0-hold-thetabsb-m`}>
      <div className="back-buttont">
        <BsChatFill />
      </div>
      <a
        target="_blank"
        href="https://forms.gle/TrSyEt4ApFtUHYxS9"
        rel="noreferrer"
      >
        Feedback
      </a>
    </div>
  );
}
export default FeedBackButton;
