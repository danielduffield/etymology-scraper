import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class UrlSubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.updateUrlInput = this.updateUrlInput.bind(this);
    this.submitUrl = this.submitUrl.bind(this);

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
    })
      .then(res => res.json())
      .then(content => console.log(content));
  }
  updateResults(response) {
    response.json().then(results => {
      this.props.dispatch({
        type: "RECEIVED_QUERY_RESULTS",
        paylod: { results }
      });
    });
  }
  render() {
    return (
      <div className="container-fluid">
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

function mapStateToProps(state) {
  return {
    urlInputValue: state.urlInputValue
  };
}

const Connected = connect(mapStateToProps)(UrlSubmitForm);
export default Connected;
