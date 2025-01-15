import React, { Component } from "react";
import moment from "moment";
import { BsGraphUp } from "react-icons/bs";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
class TodayEarning extends Component {
  state = {
    number: 0,
  };

  filterpay = () => {
    let curentdate = moment().format("MMM Do YY");
    let earnings = this.props.data.filter(
      (item) => moment(item.date).format("MMM Do YY") === curentdate,
    );
    if (earnings.length > 0) {
      this.setState({
        number: earnings.reduce((n, { earnings }) => n + earnings, 0),
      });
    }
  };

  componentDidMount = () => {
    this.filterpay();
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf two">
            <BsGraphUp />
          </div>
          <p> Today Earnings</p>
        </div>
        <div className="fjnejt">
          ${convertFromStripe(this.state.number, "USD").toFixed(2)}
        </div>
      </div>
    );
  }
}

export default TodayEarning;
