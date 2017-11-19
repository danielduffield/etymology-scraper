import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordEtym extends React.Component {
  render() {
    return (
      <div>
        {this.props.selected.word ? (
          <div>
            <span>{this.props.selected.word}</span>
          </div>
        ) : (
          <p>None Selected</p>
        )}
      </div>
    );
  }
}

const ContentContainer = styled.div`
  border: 2px solid black;
`;

WordEtym.propTypes = {
  view: PropTypes.string,
  results: PropTypes.object,
  selected: PropTypes.object,
  word: PropTypes.string
};

function mapStateToProps(state) {
  return {
    view: state.view,
    results: state.results,
    selected: state.selected
  };
}

const Connected = connect(mapStateToProps)(WordEtym);
export default Connected;
