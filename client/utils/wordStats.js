import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordStats extends React.Component {
  render() {
    return (
      <ContentContainer>
        <div className="row">
          <div className="col-6">Word</div>
          <div className="col-3">Occurences</div>
          <div className="col-3">Percentage</div>
        </div>
        {this.props.results.etymologies
          ? this.props.results.etymologies.map((wordData, index) => {
              const wordNum = index + 1;
              return (
                <KeywordMatch
                  key={index}
                  className="row"
                  matchIndex={index}
                  colorMap={this.props.colorMap}
                >
                  <div className="col-6">
                    <span>{wordNum + ". " + wordData.word.normal}</span>
                  </div>
                  <div className="col-3">
                    <span>{wordData.word.count}</span>
                  </div>
                  <div className="col-3">
                    <span>{wordData.word.percent + "%"}</span>
                  </div>
                </KeywordMatch>
              );
            })
          : ""}
      </ContentContainer>
    );
  }
}

const ContentContainer = styled.div`
  border: 2px solid black;
  text-align: center;
`;

const KeywordMatch = styled.div`
  background-color: ${props => props.colorMap[props.matchIndex]};
`;

WordStats.propTypes = {
  view: PropTypes.string,
  results: PropTypes.object,
  colorMap: PropTypes.array
};

function mapStateToProps(state) {
  return {
    view: state.view,
    results: state.results
  };
}

const Connected = connect(mapStateToProps)(WordStats);
export default Connected;
