import React, { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { HiLockClosed } from "react-icons/hi";
import { connect } from "react-redux";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
class UnpaidEarning extends Component {
  state = {
    number: 0,
  };
  getdata = () => {
    meettumApi
      .get(`/api/find-my-earning/${this.props.user.userId}`)
      .then((result) => {
        if (result.data !== "no") {
          this.setState({
            number: result.data.unpaidBalance,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    this.getdata();
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf three">
            <HiLockClosed />
          </div>
          <p> Unpaid Earnings</p>
        </div>
        <div className="fjnejt">
          ${convertFromStripe(this.state.number, "USD").toFixed(2)}
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapstateToProps)(UnpaidEarning);
