import { Link, useNavigate } from "react-router-dom";
import meettumApi from "ApiServiveGateWay/apiConfig";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import LoadingSpin from "Components/Loadingspin.js";
import TodayEarning from "earnings/today";
import TotalEarning from "earnings/total";
import MonthEarning from "earnings/month";
import UnpaidEarning from "earnings/unpaidBalance";
import useUser from "hooks/useUser";
function Earning() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const goBack = () => {
    navigate(-1);
  };

  const getinfo = () => {
    meettumApi.get(`/api/get-my-earning-data/${user.userId}`).then((result) => {
      if (result.data.length > 0) {
        setData(result.data);
      } else {
        setData([]);
      }
    });
  };

  useEffect(() => {
    getinfo();
  }, []);

  return (
    <div className="wrrapeerr-uoirjr-cham">
      <div className="title-edit">
        <div className="before-edit">
          <div onClick={goBack} className="close-that">
            <BiArrowBack />
          </div>
          <p>Earning</p>
        </div>
      </div>
      {data !== null ? (
        <div className="earningsf-boxnjf">
          <div className="hold-thegrapgjhs-jfhtf"></div>
          {data !== null ? (
            data != "no" ? (
              <div className="hold-the-box-of--the-info">
                <TotalEarning data={data} />
                <TodayEarning data={data} />
                <UnpaidEarning data={data} />
                <MonthEarning data={data} />
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="bixnknfkfjkjrjr">
          <LoadingSpin />
        </div>
      )}
    </div>
  );
}

export default Earning;
