import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordEtym extends React.Component {
  render() {
    return (
      <div>
        <span>bap</span>
      </div>
    );
  }
}

const ContentContainer = styled.div`
  border: 2px solid black;
`;

WordEtym.propTypes = {
  view: PropTypes.string,
  results: PropTypes.object
};

function mapStateToProps(state) {
  return {
    view: state.view,
    results: state.results
  };
}

const Connected = connect(mapStateToProps)(WordEtym);
export default Connected;
