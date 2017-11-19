import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordStats extends React.Component {
  render() {
    return (
      <ContentContainer className="container">
        <TableHeadings className="row">
          <div className="col-1">#</div>
          <div className="col-4">Word</div>
          <div className="col-4">Occurences</div>
          <div className="col-3">Percent</div>
        </TableHeadings>
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
                  <div className="col-1">{wordNum}</div>
                  <div className="col-4">
                    <span>{wordData.word.normal}</span>
                  </div>
                  <div className="col-4">
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

const TableHeadings = styled.div`
  font-weight: bold;
  border-bottom: 2px solid black;
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
