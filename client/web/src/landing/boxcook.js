import React, { Component } from "react";

class BoxCook extends Component {
  state = {
    click: false,
  };

  handleclick = () => {
    localStorage.setItem("accept", true);
    this.setState({
      click: true,
    });
  };
  componentDidMount = () => {
    const mode = localStorage.getItem("accept");
    if (mode) {
      this.setState({
        click: true,
      });
    } else {
      this.setState({
        click: false,
      });
    }
  };

  render() {
    return this.state.click ? (
      ""
    ) : (
      <div className="boxnfkjtotfkff">
        <div className="wjfjfjjtnr">
          <div className="insidjrjrj">
            We use cookies on our websites to enhance your experience, analyze
            traffic, and for security and marketing.
          </div>
          <button onClick={this.handleclick} className="jtjjrrg">
            UNDERSTOOD
          </button>
        </div>

        <div></div>
      </div>
    );
  }
}

export default BoxCook;
