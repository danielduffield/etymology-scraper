import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ArticleView from "./articleView.js";
import WordStats from "./wordStats.js";
import WordEtym from "./wordEtym.js";

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
          <div className="col-3">
            <WordStats colorMap={colorMap} />
          </div>
          <div className="col-6">
            <ArticleView colorMap={colorMap} />
          </div>
          <div className="col-3">
            <WordEtym />
          </div>
        </div>
      </div>
    );
  }
}

const colorMap = [
  "red",
  "blue",
  "green",
  "yellow",
  "firebrick",
  "palegoldenrod",
  "purple",
  "brown",
  "orange",
  "indigo",
  "grey",
  "pink",
  "red",
  "blue",
  "green",
  "yellow",
  "firebrick",
  "palegoldenrod",
  "purple",
  "brown"
];

QueryResults.propTypes = {
  dispatch: PropTypes.func,
  view: PropTypes.string,
  results: PropTypes.object
};

function mapStateToProps(state) {
  return {
    results: state.results,
    view: state.view
  };
}

const Connected = connect(mapStateToProps)(QueryResults);
export default Connected;
