import React, { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Editable from "./shared/Editable";
import EditPreviews from "programs/editPreviews";
import LoadingSpin from "./Loadingspin";
class Editprogram extends Component {
  state = {
    open: false,
    title: "",
    description: "",
    file: null,
    button: false,
    preview: null,
    price: null,
    kind: null,
    loading: false,
  };
  saveChange = () => {
    let formData = new FormData();
    formData.append("author", this.props.user.username);
    formData.append("publisherId", this.props.user.userId);
    if (this.state.title !== this.props.program.title) {
      formData.append("title", this.state.title);
    }
    formData.append("programId", this.props.program.programId);
    formData.append("description", this.state.description);
    if (
      this.state.title !== this.props.program.title ||
      this.state.description !== this.props.program.description ||
      this.state.price !== this.props.program.price
    ) {
      let option;
      if (this.state.title !== this.props.program.title) {
        option = {
          title: this.state.title,
          description: this.state.description,
          publisherId: this.props.user.userId,
          programId: this.props.program.programId,
          price: this.state.price,
        };
      } else {
        option = {
          description: this.state.description,
          publisherId: this.props.user.userId,
          programId: this.props.program.programId,
          price: this.state.price,
        };
      }
      this.setState({
        loading: true,
      });
      axios
        .post(`/api/update-my-program-detail-with-no-image`, option)
        .then((res) => {
          this.props.getProgramInfo();
          this.props.handlOpen(false);
        });
    } else {
      this.props.handlOpen(false);
    }
  };
  changeLoading = (value) => {
    this.setState({
      loading: value,
    });
  };
  handleChange = (event) => {
    this.setState({
      title: event.target.value,
      button: true,
    });
  };

  handlepriece = (event) => {
    this.setState({
      price: parseInt(event.target.value),
      button: true,
    });
  };

  handledecription = (event) => {
    this.setState({
      description: event.target.innerText,
      button: true,
    });
  };

  componentDidMount = () => {
    this.setState({
      description: this.props.program.description,
      title: this.props.program.title,
      price: this.props.program.price,
    });
  };
  render() {
    return (
      <div
        className={`overlay-new-program  ${
          this.props.edit === false ? "" : "active"
        }`}
      >
        <div className="box-that-create-a-new-program">
          <div className="title-of--thise-action">
            <button
              onClick={() => this.props.handlOpen(false)}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>Edit Program</p>
          </div>
          <EditPreviews
            changeLoading={this.changeLoading}
            handlOpen={this.props.handlOpen}
            getProgramInfo={this.props.getProgramInfo}
            program={this.props.program}
          />
          <div className="edit-box-profile">
            <label htmlFor="title">Title</label>
            <input
              onChange={this.handleChange}
              value={`${this.state.title !== null ? this.state.title : ""}`}
              className="username-profile"
              type="text"
              placeholder={this.props.program.title}
            />
          </div>

          <div className="edit-box-profile">
            <p>Description</p>
            <div className="watpr-contnr-mem edit-for">
              <div className="wrappe-mmeshe-bio">
                {this.props.program.description !== null ? (
                  <Editable
                    handleBio={this.handledecription}
                    html={this.props.program.description}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {this.props.program.programType === 1 ? (
            <div className="edit-box-profile">
              <label htmlFor="title">Price</label>
              <div className="wharoor-the-amoiut">
                <p className="desd">$</p>
                <input
                  onChange={this.handlepriece}
                  value={`${this.state.price !== null ? this.state.price : ""}`}
                  className="username-profile"
                  placeholder={this.props.program.price}
                  type="number"
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            className={`conte-thise-action ${
              this.state.button ? "active" : ""
            } ${this.state.loading && "loading"}`}
          >
            <button
              disabled={this.state.loading}
              onClick={this.saveChange}
              className="save"
            >
              {this.state.loading ? <LoadingSpin /> : "Save Change"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Editprogram);
