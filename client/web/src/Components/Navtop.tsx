import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";

class Navtop extends Component {
  render() {
    return (
      <div className="navigation-top">
        <div className="close-itt">
          <button>
            <IoCloseSharp />
          </button>
        </div>
        <div className="nav-lii nav-infoo">
          <div className="ic">
            <i className="far fa-plus-square"></i>
          </div>

          <a href="/post">Post</a>
        </div>
        <div className="nav-lii nav-infoo   " data-tab-target="#">
          <div className="ic">
            <i className="fas fa-video"></i>
          </div>

          <a href="/live">Live Workout</a>
        </div>
      </div>
    );
  }
}

export default Navtop;
