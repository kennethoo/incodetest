import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { BiArrowBack } from "react-icons/bi";
import DataPost from "Components/datePost";
import { motion } from "framer-motion";
import { SiGooglemaps } from "react-icons/si";
import socket from "realtimeBoardSocket";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";
function LoginActivity() {
  const [state, setState] = useState({
    detail: null,
  });
  const { user } = useUser();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const logout = (item) => {
    let option = {
      id: item._id,
    };
    meettumApi
      .post("/api/remove/session", option, { withCredentials: true })
      .then((result) => {
        socket.emit("check-thatlogind", user.userId);
        getlogetactivity();
      });
  };

  const getlogetactivity = () => {
    meettumApi
      .get("/api/sessions", { withCredentials: true })
      .then((result) => {
        if (result.data.succeeded) {
        } else {
          setState({
            ...state,
            detail: result.data,
          });
        }
      });
  };

  useEffect(() => {
    getlogetactivity();
  }, []);

  return (
    <div className="wrrapeerr-uoirjr-cham">
      <div className="title-edit">
        <div className="before-edit">
          <div onClick={goBack} className="close-that">
            <BiArrowBack />
          </div>
          <p>Login Activities</p>
        </div>
      </div>
      <div className="hols-tjsjttnej">
        <div className="rjeiwroknr">
          <p>All device that are login to your account will be listed here</p>
        </div>
      </div>
      <div className="psjriroor">
        {state.detail !== null && Array.isArray(state.detail)
          ? state?.detail?.map((item, index) => {
              return (
                <motion.div layout key={index} className="wlofnssfjr">
                  <div className="wraricjfri">
                    <div className="cikxjjf">
                      <SiGooglemaps />
                    </div>
                    <div className="load-fgjfj">
                      {/*    <div className="wifioftit">
{item.session.user.region},{item.session.user.city}
    </div>*/}
                      <div className="wifioftit">
                        <div className="dateitir">
                          <DataPost date={item.session.user.time} />
                        </div>
                        <div className="dateitir">
                          {item.session.user.device}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tabsjdjdj">
                    <button>
                      <Link to={"/setting/changePassword"}>
                        Change Password
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        logout(item);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default LoginActivity;
