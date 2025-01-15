import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegCreditCard, FaPaypal } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
class AddMethod extends Component {
  state = {
    listCard: null,
    button: false,
    option: false,
    field: true,
  };

  handlePaymentcard = () => {
    this.setState({
      option: false,
      field: true,
    });
  };
  render() {
    return (
      <div className="wraojrikkr-obebe">
        <div className="dnjsjrjrjr">
          <div className="title-of--thise-action">
            <button
              onClick={() => {
                this.props.hnddleclick();
              }}
              className="close-that"
            >
              {" "}
              <IoCloseSharp />
            </button>
            <p>Add Payment Method</p>
          </div>
          {this.state.option ? (
            <div className="wroiriitiiir">
              <div onClick={this.handlePaymentcard} className="pay-with-card">
                <div className="wrtapr">
                  <div className="iconfte">
                    <FaRegCreditCard />
                  </div>
                  <div className="titler">Credit / Debit card</div>
                </div>
                <div className="rkieokr">
                  <HiOutlineChevronRight />
                </div>
              </div>
              {/*     <div className="pay-with-card">
                <div className="wrtapr">
                <div className="iconfte"  >
                     <FaPaypal/>
                   </div>
                   <div className="titler">Paypal</div>
                </div>
                <div className="rkieokr">
                <HiOutlineChevronRight/>
                </div>
                </div>*/}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default AddMethod;
