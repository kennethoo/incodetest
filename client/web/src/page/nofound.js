import React, { Component } from "react";
import TopNavigation from "landing/TopNavigation";

class NoFound extends Component {
  switchToggle = () => {
    this.setState({
      mode: !this.state.mode,
    });
    localStorage.setItem("mode", !this.state.mode);
  };
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };
  render() {
    return (
      <div className="wrpatrrbox">
        <TopNavigation
          switchToggle={this.switchToggle}
          openNav={this.openNav}
        />

        <div className="wraperrr-jsjjr">
          <div className="fjsfieiitwiree">
            <div className="rrrsrte"> 404</div>
            <div className="rrkrr">
              {" "}
              We can't seem to find the page you're looking for
            </div>

            <div className="rrtrjtjtkrr">
              <button>
                <a href="/">Back to Homepage</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NoFound;
