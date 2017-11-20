import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WordEtym extends React.Component {
  render() {
    const defIndex = this.props.defined.findIndex(
      word => word === this.props.selected.word
    );
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
              {defIndex !== -1
                ? this.props.definitions[defIndex].etm.map(pair => {
                    console.log("PAIR ", pair);
                    const keys = Object.keys(pair);
                    return keys.map((key, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {key + " "}
                            <Italic>{pair[key]}</Italic>
                          </p>
                        </div>
                      );
                    });
                  })
                : ""}
              <hr />
              <EtymHeading>{"DATE"}</EtymHeading>
              <p>
                {this.props.definitions &&
                this.props.defined &&
                this.props.defined.join(" ").includes(this.props.selected.word)
                  ? this.props.definitions[defIndex].date
                  : ""}
              </p>
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

const Italic = styled.span`
  font-style: italic;
`;

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
    selected: state.selected,
    definitions: state.definitions,
    defined: state.defined
  };
}

const Connected = connect(mapStateToProps)(WordEtym);
export default Connected;
