import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function TermCondition() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="wrrapeerr-uoirjr-cham">
      <div className="title-edit">
        <div className="before-edit">
          <div onClick={goBack} className="close-that">
            <BiArrowBack />
          </div>
          <p>Terms and conditions</p>
        </div>
      </div>
      <div className="wrapririrr">
        <div className="wrpsjrirrr">
          <Link to="/termsconditon" className={`carvjdgjjfk  `}>
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

          <Link to="/privacy" className={`carvjdgjjfk  `}>
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
export default TermCondition;
