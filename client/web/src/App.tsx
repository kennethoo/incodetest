import "./App.css";
import "style/style.css";
import "style/ui.css";
import "style/setting.css";
import "style/setup.css";
import "style/meeting.css";
import "style/landing.css";
import "style/meetingRoom.css";
import "style/message.css";
import "style/responsive.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "page/register";
import Landing from "page/landingPage";
import Home from "page/Home";
import Loading from "Components/loading";
import Login from "page/Login";
import NoFound from "page/nofound";
import { useDispatch } from "react-redux";
import socket from "realtimeBoardSocket";
import useUser from "hooks/useUser";
import { useSelector } from "react-redux";
import Code from "page/Code";
import Setting from "page/Setting";
import ChangePassword from "page/ChangePassword";
import Logger from "Components/Logger";
import Terms from "landing/terms";
import Termss from "landing/termss";
import Policy from "landing/policy";
import Cookies from "landing/coki";
import ModalWraper from "modals/ModalWraper";
import Analytic from "page/Analytic";
import MeettumConfetti from "animation/MeettumConfetti";
import { RouteWithAuthentificationRequireWithSideBar } from "router/RouteWithAuthentificationRequireWithSideBar";
import RouteWithAuthentificationRequireNoSideBar from "router/RouteWithAuthentificationRequireNoSideBar";
import SharedProjectPlayGround from "page/SharedProjectPlayGround";
import ProjectsPlaygroud from "page/ProjectsPlaygroud";
import RouteAuth from "router/RouteAuth";
import ApiKeys from "page/ApiKeys";
import Wallets from "page/Wallets";
import Projects from "page/Projects";
import ExecutionDetail from "page/ExecutionDetails";
import ProJoinPage from "page/ProJoinPage";
import GuestPlaygroud from "page/GuestPlaygroud";
import Test from "page/Test";
import AdminRoute from "router/AdminRoute";
import Repository from "page/Repository";
import UploadProjectIdea from "page/UploadProjectIdea";
import CodeSession from "page/CodeSession";
import Session from "page/Session";
function App(): JSX.Element {
  const message = useSelector(
    (state: { messageToLog: string }) => state.messageToLog,
  );

  const isConfetti = useSelector(
    (state: { isConfetti: boolean }) => state.isConfetti,
  );
  const { user } = useUser();

  const dispatch = useDispatch();

  const loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
  };
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === null) {
      loadTheme("dark");
      dispatch({ type: "UPDATE_MODE", value: "dark" });
    } else {
      loadTheme(mode);
      dispatch({ type: "UPDATE_MODE", value: mode });
    }
  }, []);

  useEffect(() => {
    socket.on("check-everone-login-activity", () => {
      window.location.reload();
    });

    return () => {
      socket.off("check-everone-login-activity");
    };
  }, [user]);

  return (
    <div id="applicaiton-meetttum">
      {isConfetti && <MeettumConfetti />}

      <div id="appppp">
        <Routes>
          <Route element={<Loading redirect={true} />} path="/" />
          <Route element={<Landing />} path="/hello" />
          <Route element={<Navigate to="/app/home" />} path="/app" />
          <Route element={<Termss />} path="/terms" />
          <Route element={<Terms />} path="/termsconditon" />
          <Route element={<Cookies />} path="/cookies" />
          <Route element={<ChangePassword />} path="changepassword" />
          <Route element={<Policy />} path="/privacy" />
          <Route element={<GuestPlaygroud />} path="/playground" />
          <Route
            element={<SharedProjectPlayGround />}
            path="/shared/:id/:tab?"
          />
          <Route
            path="/app"
            element={<RouteWithAuthentificationRequireWithSideBar />}
          >
            <Route element={<Home />} path="home" />
            <Route element={<Code />} path="code" />
            <Route element={<Analytic />} path="analytic" />
            <Route element={<Setting />} path="setting" />
            <Route element={<Setting />} path="setting/:id" />
            <Route element={<ApiKeys />} path="apikeys" />
            <Route element={<Wallets />} path="wallet" />
            <Route element={<Projects />} path="projects" />
            <Route element={<ExecutionDetail />} path="execution/:id" />

            <Route element={<Repository />} path="repo" />
            <Route element={<Session />} path="session" />
          </Route>
          <Route path="/app" element={<AdminRoute />}>
            <Route element={<Test />} path="test" />
            <Route element={<UploadProjectIdea />} path="idea" />
          </Route>

          <Route
            path="/app"
            element={<RouteWithAuthentificationRequireNoSideBar />}
          >
            <Route element={<ProJoinPage />} path="join/pro" />
            <Route
              element={<ProjectsPlaygroud />}
              path="project/:projectId/:tab?"
            />
            <Route element={<CodeSession />} path="session/:sessionId/:tab?" />
          </Route>
          <Route element={<RouteAuth />}>
            <Route element={<Register />} path="/register"></Route>
            <Route element={<Login />} path="/login"></Route>
          </Route>
          <Route element={<NoFound />} path="*" />
        </Routes>

        <ModalWraper />

        {message?.length > 0 && <Logger />}
      </div>
    </div>
  );
}

export default App;
