import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ArticleView extends React.Component {
  constructor(props) {
    super(props);

    this.selectKeyword = this.selectKeyword.bind(this);
    this.deselectKeyword = this.deselectKeyword.bind(this);
  }
  scanContents(text, keywords) {
    let acc = "";
    let toRender = [];
    text.split(" ").forEach((word, i) => {
      let matched = false;
      keywords.forEach((match, index) => {
        if (match.toLowerCase() === word.toLowerCase()) {
          toRender.push(<span>{acc}</span>);
          toRender.push(
            <KeywordMatch
              className="keyword"
              matchIndex={index}
              colorMap={this.props.colorMap}
              onMouseOver={this.selectKeyword}
              onMouseOut={this.deselectKeyword}
            >
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
    if (acc) toRender.push(<span>{acc}</span>);
    return toRender;
  }
  selectKeyword(event) {
    this.props.dispatch({
      type: "SELECTED_KEYWORD",
      payload: {
        keyword: {
          word: event.target.textContent.toLowerCase()
        }
      }
    });
  }
  deselectKeyword(event) {
    this.props.dispatch({
      type: "DESELECTED_KEYWORD"
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="title-container">
              <h1 className="main-title">Etymology Scraper</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <h4>
              <a href={this.props.results.url}>{this.props.results.title}</a>
            </h4>
          </div>
          <div className="row">
            <div className="col">
              {this.props.results.etymologies
                ? this.scanContents(this.props.textBlock, this.props.keywords)
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleView.propTypes = {
  dispatch: PropTypes.func,
  view: PropTypes.string,
  results: PropTypes.object,
  colorMap: PropTypes.array,
  textBlock: PropTypes.string,
  keywords: PropTypes.array
};

const TitleLinkContainer = styled.p`
  text-align: center;
`;

const KeywordMatch = styled.span`
  background-color: ${props => props.colorMap[props.matchIndex]};
`;

function mapStateToProps(state) {
  return {
    results: state.results,
    keywords: state.keywords,
    textBlock: state.textBlock,
    view: state.view
  };
}

const Connected = connect(mapStateToProps)(ArticleView);
export default Connected;
