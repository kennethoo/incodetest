import ConnectToGoogleCalendar from "auth/ConnectToGoogleCalendar";
import useUser from "hooks/useUser";
function ConnecToOtherPlaform() {
  const { user } = useUser();
  const haveAGooGoogleAccount = user?.connectedAccounts.find((item) => {
    return item.accountType === "google";
  });

  return !haveAGooGoogleAccount ? (
    <div className="wraperr-for-meeting">
      <div className="section-bax-title">
        <h3>Link your Account</h3>
      </div>
      <div className="wraper-meeting-list">
        <ConnectToGoogleCalendar />
      </div>
    </div>
  ) : null;
}
export default ConnecToOtherPlaform;
