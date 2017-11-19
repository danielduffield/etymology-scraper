import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ArticleView extends React.Component {
  scanContents(text, keywords) {
    let acc = "";
    let toRender = [];
    text.split(" ").forEach((word, i) => {
      let matched = false;
      keywords.forEach((match, index) => {
        if (match.toLowerCase() === word.toLowerCase()) {
          toRender.push(<span>{acc}</span>);
          toRender.push(
            <KeywordMatch className="keyword" matchIndex={index}>
              {word}
            </KeywordMatch>
          );
          acc = " ";
          matched = true;
        }
      });
      acc = matched ? " " : acc + word + " ";
      matched = false;
    });
    return toRender;
  }
  render() {
    return (
      <div>
        <h3>
          <a href={this.props.results.url}>{this.props.results.title}</a>
        </h3>
        {this.props.results.etymologies
          ? this.scanContents(
              this.props.results.contents,
              this.props.results.etymologies.map(
                wordData => wordData.word.normal
              )
            )
          : ""}
      </div>
    );
  }
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
