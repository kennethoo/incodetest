import React, { Component } from "react";
import { AiFillFolder } from "react-icons/ai";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
class TotalEarning extends Component {
  state = {
    data: 0,
  };
  componentDidMount = () => {
    this.setState({
      data: this.props.data.reduce((n, { earnings }) => n + earnings, 0),
    });
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf one">
            <AiFillFolder />
          </div>
          <p>Total Earnings</p>
        </div>
        <div className="fjnejt">
          ${convertFromStripe(this.state.data, "USD").toFixed(2)}
        </div>
      </div>
    );
  }
}

export default TotalEarning;
