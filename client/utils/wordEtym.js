import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordEtym extends React.Component {
  render() {
    return (
      <Wrapper className="sticky-top">
        <EtymCard className="row">
          {this.props.selected.word ? (
            <div className="col">
              <hr />
              <EtymHeading>{"WORD"}</EtymHeading>
              <p>{this.props.selected.word}</p>
              <hr />
              <EtymHeading>{"ETYMOLOGY"}</EtymHeading>
              <p>Language: </p>
              <hr />
              <EtymHeading>{"DATE"}</EtymHeading>
              <p>Century</p>
              <hr />
            </div>
          ) : (
            <div className="col" />
          )}
        </EtymCard>
      </Wrapper>
    );
  }
}

const EtymHeading = styled.p`
  font-weight: bold;
`;

const EtymCard = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  top: 200px;
`;

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
