import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { connect } from "react-redux";
import meettumApi from "ApiServiveGateWay/apiConfig";
class Report extends Component {
  state = {
    report: [
      {
        name: "Post",
        data: [
          "nudity",
          "Violence",
          "This post is not related to fitness or Sport ",
          "I dont't like this post",
          "This post contains horible scene",
          "Self-harm",
        ],
      },
      {
        name: "Reviews",
        data: ["Hurtful Reviews"],
      },
      {
        name: "Program-Contains",
        data: [
          "nudity",
          "Violence",
          "Not related to fitness or Sport ",
          "Horible scene",
        ],
      },
      {
        name: "Conversation",
        data: [
          "It's a spam",
          "It is Hurtful",
          "Not related to fitness or Sport",
          "Horible scene",
        ],
      },
      {
        name: "Comment",
        data: ["It is Hurtful", "Not related to fitness or Sport"],
      },
    ],
    toShow: [],
    open: false,
  };

  postReport = (item) => {
    let option = {
      item: this.props.report.file,
      kind: this.props.report.kind,
      detail: item,
    };

    axios
      .post("/api/reportpost", option)
      .then((data) => {
        this.props.updataReport({ open: false, file: "", kind: "" });
      })
      .catch((err) => {
        return;
      });
  };
  handleFilter = () => {
    let list = this.state.report.filter(
      (item) => item.name === this.props.report.kind,
    );
    this.setState({
      toShow: list,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.state.open !== this.props.report.open) {
      this.handleFilter();
      this.setState({ open: this.props.report.open });
    }
  }

  componentDidMount = () => {};
  render() {
    return (
      <div
        className={`report-hiver-overt ${
          this.props.report.open ? "active" : ""
        }`}
      >
        <div className="box-theholf-thereport">
          <div className="reportbt-title">
            <div
              onClick={() => {
                this.props.updataReport({ open: false, file: "", kind: "" });
              }}
              className="close-that"
            >
              <IoCloseSharp />
            </div>
            Report a Problem
          </div>
          <div className="fjektmkrkrkk">
            <div className="box-that-hiold-the-repdescripentr">
              Assist us in comprehending the issue. What's the deal with this{" "}
              {this.state.toShow.length > 0 ? this.state.toShow[0].name : ""}?
            </div>

            <div className="hiold-infosnjrnr">
              {this.state.toShow.length > 0
                ? this.state.toShow[0].data.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          this.postReport(item);
                        }}
                        className="holt-proposition"
                        key={index}
                      >
                        {item}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    report: state.report,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", value: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(Report);
