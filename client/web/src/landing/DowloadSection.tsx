import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top:50px;

  & p {
    text-align: center;
    max-width
  }
`;
function DowloadSection() {
  return (
    <Container id="download-section">
      <p style={{ fontSize: "25px" }}>Download MEETCODE App</p>
      <p style={{ marginTop: "10px" }}>
        Get the app for a better experience on your mobile device.
      </p>
      <div className="app-buttons">
        <a
          href="https://apps.apple.com/us/app/meettum/id6471353266"
          className="download-button ios"
        >
          <img
            src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
            alt="Download on iOS"
          />
          <p>Download on App Store</p>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.meettumapp"
          className="download-button android"
        >
          <img
            src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Icon-Logo.wine.svg"
            alt="Download on Android"
          />
          <p>Download on Play Store</p>
        </a>
      </div>
    </Container>
  );
}
export default DowloadSection;
