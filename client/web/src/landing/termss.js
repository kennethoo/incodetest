import React, { Component } from "react";
import TopNavigation from "./TopNavigation";
import { FiCheckCircle } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

class Termss extends Component {
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };
  render() {
    return (
      <div className="termsmss">
        <TopNavigation
          switchToggle={this.switchToggle}
          openNav={this.openNav}
        />
        <div className="wrapririr">
          <div className="titlekr">Terms and conditions center</div>
          <div className="wrpsjrirr">
            <Link
              to="/termsconditon"
              className={`carvjdgjjfk ${this.props.mode ? "active" : ""} `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <FiCheckCircle />
                </div>
                <p className="fhgjentr">Terms & Conditions</p>
              </div>

              <div className="describejrjr">
                Here you can reviews our Terms & Conditions
              </div>
            </Link>
            <Link
              to="/cookies"
              className={`carvjdgjjfk ${this.props.mode ? "active" : ""} `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BiCookie />
                </div>
                <p className="fhgjentr">Cookies Policy</p>
              </div>

              <div className="describejrjr">
                Here you can reviews our Cookies Policy
              </div>
            </Link>

            <Link
              to="/privacy"
              className={`carvjdgjjfk ${this.props.mode ? "active" : ""} `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BsShieldCheck />
                </div>
                <p className="fhgjentr">Privacy Policy</p>
              </div>

              <div className="describejrjr">
                Here you can reviews our Privacy Policy
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Termss;
