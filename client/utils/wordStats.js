import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordStats extends React.Component {
  render() {
    return (
      <ContentContainer>
        {this.props.results.etymologies
          ? this.props.results.etymologies.map((wordData, index) => {
              return (
                <div key={index}>
                  <p>{"Word: " + wordData.word.normal}</p>
                  <p>{"Count: " + wordData.word.count}</p>
                  <p>{"Percent: " + wordData.word.percent}</p>
                </div>
              );
            })
          : ""}
      </ContentContainer>
    );
  }
}

const ContentContainer = styled.div`
  border: 2px solid black;
`;

WordStats.propTypes = {
  view: PropTypes.string,
  results: PropTypes.object
};

function mapStateToProps(state) {
  return {
    view: state.view,
    results: state.results
  };
}

const Connected = connect(mapStateToProps)(WordStats);
export default Connected;

/*

{this.props.results.etymologies
  ? this.props.results.etymologies.map((keyWord, index) => {
      return (
        <div key={index}>
          <p>{"Key Word: " + keyWord.word.normal}</p>
          <p>{"Count: " + keyWord.word.count}</p>
          <p>{"Percent: " + keyWord.word.percent}</p>
        </div>
      );
    })
  : ""}

*/
