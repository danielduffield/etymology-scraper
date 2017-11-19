import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ArticleView extends React.Component {
  render() {
    return (
      <div>
        <h3>
          <a href={this.props.results.url}>{this.props.results.title}</a>
        </h3>
        {this.props.results.contents
          ? flagMatches(
              this.props.results.contents,
              this.props.results.etymologies.map(
                wordData => wordData.word.normal
              )
            )
              .split("<<<")
              .map(line => line.split(">>>"))
              .map((parsed, index) => {
                if (index === 0) {
                  const temp = parsed.slice()[0];
                  parsed[0] = parsed[1];
                  parsed[1] = temp;
                }
                const matchIndex = this.props.results.etymologies
                  .map(wordData => wordData.word.normal)
                  .findIndex(word => word === parsed[0]);
                console.log(matchIndex);
                return (
                  <span key={index}>
                    <KeywordMatch className="keyword" matchIndex={matchIndex}>
                      {parsed[0]}
                    </KeywordMatch>
                    <span>{parsed[1]}</span>
                  </span>
                );
              })
          : ""}
      </div>
    );
  }
}

function flagMatches(text, keywords) {
  let flagged = text;
  keywords.forEach(word => {
    const regexMatch = new RegExp("[^a-zA-Zd]" + word + "[^a-zA-Zd]", "gi");
    flagged = flagged.replace(regexMatch, " <<<" + word + ">>> ");
  });
  return flagged;
}

ArticleView.propTypes = {
  dispatch: PropTypes.func,
  view: PropTypes.string,
  results: PropTypes.object
};

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

const KeywordMatch = styled.span`
  background-color: ${props => colorMap[props.matchIndex]};
`;

function mapStateToProps(state) {
  return {
    results: state.results,
    view: state.view
  };
}

const Connected = connect(mapStateToProps)(ArticleView);
export default Connected;
