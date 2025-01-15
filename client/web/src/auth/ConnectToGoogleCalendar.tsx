import { useState, useEffect } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import LoadingSpin from "Components/Loadingspin";
import useLogger from "hooks/useLogger";
let count = 0;
function ConnectToGoogleCalendar() {
  const logger = useLogger();
  const [url, setUrl] = useState("");
  const [isLoading, setIsloading] = useState(false);
  async function loginWithGoogle(user_object) {
    setIsloading(true);
    const { data } = await meettumApi.post(
      "/api/v1/google/calendar/token/save",
      user_object,
    );
    setIsloading(false);
    const { succeeded, errorMessage } = data;
    if (succeeded) {
      window.location.href = "./app/home";
    } else {
      logger({
        isErrorMessage: true,
        message: errorMessage,
        fileName: "ConnectToGoogleCalendar.tsx",
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await meettumApi.get("/api/v1/google/calendar/auth-url");
      const { succeeded, authUrl } = data;
      if (succeeded) {
        setUrl(authUrl);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    count++;
    if (count !== 1) return;
    const code = new URLSearchParams(window.location.search).get("code");
    if (code !== null) saveToken();
    function saveToken() {
      const playLoad = {
        accountType: "google",
        code,
      };
      loginWithGoogle(playLoad);
    }
  }, []);

  return url ? (
    <div className="box-to-book-link">
      {isLoading ? (
        <button disabled={true} className="copy-meettinglink">
          Linking...😄😄
          <LoadingSpin />
        </button>
      ) : (
        <button className="copy-meettinglink">
          <a href={url}>Connect Google Calendar</a>
        </button>
      )}
    </div>
  ) : null;
}
export default ConnectToGoogleCalendar;

// <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />;
