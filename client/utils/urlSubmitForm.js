import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UrlSubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.updateUrlInput = this.updateUrlInput.bind(this);
    this.submitUrl = this.submitUrl.bind(this);
    this.updateResults = this.updateResults.bind(this);

    this.urlForm = null;
  }
  updateUrlInput(event) {
    this.props.dispatch({
      type: "UPDATED_URL_INPUT_VALUE",
      payload: { text: event.target.value }
    });
  }
  submitUrl(event) {
    event.preventDefault();
    const url = new FormData(this.urlForm).get("url-submit-input");
    fetch("api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ url })
    }).then(res => this.updateResults(res));
  }
  updateResults(response) {
    response.json().then(results => {
      this.props.dispatch({
        type: "RECEIVED_QUERY_RESULTS",
        payload: { results }
      });
    });
  }
  render() {
    return (
      <div
        className={
          "container-fluid" + (this.props.view === "submitUrl" ? "" : " hidden")
        }
      >
        <div className="row">
          <div className="col-6 offset-3">
            <div className="title-container">
              <h1 className="main-title">Etymology Scraper</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 offset-3">
            <form
              id="url-submit-form"
              onSubmit={this.submitUrl}
              ref={form => {
                this.urlForm = form;
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  id="url-submit-input"
                  name="url-submit-input"
                  className="form-control"
                  placeholder="Your URL Goes Here"
                  onChange={this.updateUrlInput}
                  value={this.props.urlInputValue}
                  autoFocus
                />
                <span className="input-group-btn">
                  <button
                    id="url-submit-btn"
                    className="btn btn-default"
                    type="submit"
                  >
                    Engage!
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UrlSubmitForm.propTypes = {
  dispatch: PropTypes.func,
  view: PropTypes.string,
  urlInputValue: PropTypes.string
};

function mapStateToProps(state) {
  return {
    urlInputValue: state.urlInputValue,
    view: state.view
  };
}

const Connected = connect(mapStateToProps)(UrlSubmitForm);
export default Connected;
