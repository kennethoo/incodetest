import SideNavigation from "Components/SideNavigation";
import meettumApi from "ApiServiveGateWay/apiConfig";
import "style/setting.css";
import { useEffect } from "react";
import Mode from "settingpage/mode";
import LoginActivity from "settingpage/loginactivity";
import { MdModeEdit } from "react-icons/md";
import TermCondition from "settingpage/termandcondition";
import ChangePassword from "settingpage/changePassword";
import { RiLockPasswordFill } from "react-icons/ri";
import { SiGooglemaps } from "react-icons/si";
import { BsMoon, BsArrowRepeat } from "react-icons/bs";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import Edit from "page/editAccount";
import DeleteAccount from "Components/DeleteAccount";
import { useNavigate, Link, useParams } from "react-router-dom";
import FeedBackButton from "settingpage/FeedBackButton";
import MannageSubscription from "settingpage/MannageSubscription";
import PaymentInfo from "settingpage/PaymentInfo";
import styled from "styled-components";
import { MdPayment } from "react-icons/md";

const Container = styled.div``;

const SettingOption = styled.div`
  position: relative;
  margin: 0 auto;
  width: 95%;
  cursor: pointer;
  height: 40px;
  border-radius: 30px;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  color: var(--text);

  & a {
    color: var(--text);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;
const IconOption = styled.div`
  min-width: 50px;
  height: 50px;
  color: var(--text);
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;
function Setting() {
  const { id }: { id?: string } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/app/home");
  };

  const logout = () => {
    meettumApi.get("/api/v1/logout", { withCredentials: true }).then((res) => {
      window.location.reload();
    });
  };
  useEffect(() => {
    if (id === undefined) {
      if (window.screen.width >= 1101) {
        // navigate('/setting/edit');
        navigate("/app/setting/edit");
      }
    }
  }, [id]);

  return (
    <div className="conatiner">
      <div className="container-app">
        <div className="tabs-that0-hold-the-setting">
          <div
            className={`bar-that-hold-it   ${
              id !== undefined ? "displauie" : ""
            }  `}
          >
            <div className="tilte-t-the-message">
              <div className="jrnrjnjrnf">
                <div onClick={goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <p>Settings</p>
              </div>
            </div>
            <SettingOption
              style={{ backgroundColor: id === "edit" && "#6f56e5" }}
            >
              <IconOption>
                <MdModeEdit />
              </IconOption>
              <Link to={"/app/setting/edit"}>Edit Account</Link>
            </SettingOption>

            <SettingOption onClick={logout}>
              <IconOption>
                <BiLogOut />
              </IconOption>
              Log out
            </SettingOption>
           
          </div>
          <div
            className={`wrapr-thatj-tahbs ${id !== undefined ? "active" : ""}`}
          >
            <SettingSection id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Setting;

function SettingSection({ id }) {
  if (id === undefined) return <></>;

  return (
    <div className={`sub-wraprj-tabs`}>
      {id === "changePassword" && <ChangePassword />}
      {/* {id === 'earning' && <Earning />} */}
      {id === "termsCondition" && <TermCondition />}
      {id === "mode" && <Mode />}
      {id === "edit" && <Edit />}
      {id === "loginActivity" && <LoginActivity />}
      {id === "subscription" && <MannageSubscription />}
      {id === "paymentoption" && <PaymentInfo />}
    </div>
  );
}
