import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class ResultsPage extends React.Component {
  render() {
    return (
      <div>
        <p>{this.state.results}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results
  };
}

const Connected = connect(mapStateToProps)(ResultsPage);
export default Connected;
