import React, { Component } from "react";
import moment from "moment";
import { BsBarChartFill } from "react-icons/bs";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
class MonthEarning extends Component {
  state = {
    number: 0,
  };

  getearn = () => {
    let name = "";
    let currentMonth = "0" + (new Date().getMonth() + 1);
    let currentYear = new Date().getFullYear().toString();

    let list = [];
    this.props.data.forEach((item) => {
      if (
        moment(item.date).format("L").includes(currentMonth) &&
        moment(item.date).format("L").includes(currentYear)
      ) {
        list.push(item);
      } else {
      }
    });
    if (list.length > 0) {
      this.setState({
        number: list.reduce((n, { earnings }) => n + earnings, 0),
      });
    } else {
    }
  };
  componentDidMount = () => {
    this.getearn();
  };
  render() {
    return (
      <div className="box-njfn">
        <div className="gjrjg">
          <div className="iocnjfkf four">
            <BsBarChartFill />
          </div>
          <p> This Month Earnings</p>
        </div>
        <div className="fjnejt">
          ${convertFromStripe(this.state.number, "USD").toFixed(2)}
        </div>
      </div>
    );
  }
}

export default MonthEarning;
