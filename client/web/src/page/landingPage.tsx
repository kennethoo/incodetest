import TopNavigation from "landing/TopNavigation";
import BoxCook from "landing/boxcook";
import Fouter from "landing/Fouter";
import Info from "landing/Info";
import PreviewCodeDemo from "landing/PreviewCodeDemo";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import Feature from "landing/Feature";
function LandingPage() {
  return (
    <div className="lading">
      <TopNavigation />
      <Info />
      <div className="holsnjnfj-iofjf"></div>
      <div className="section-info-acti">
      <PreviewCodeDemo/>
      </div>

      <BoxCook />
    </div>
  );
}

export default LandingPage;
