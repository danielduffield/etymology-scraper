import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class QueryResults extends React.Component {
  render() {
    return (
      <div
        className={
          "container-fluid" +
          (this.props.view === "displayResults" ? "" : " hidden")
        }
      >
        <div className="row">
          <div className="col-6 offset-3">
            <p>{this.props.results}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
    view: state.view
  };
}

const Connected = connect(mapStateToProps)(QueryResults);
export default Connected;
