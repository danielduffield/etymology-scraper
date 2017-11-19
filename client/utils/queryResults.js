import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Tab = styled.li`
  color: #dae2df;
`;

const NavLink = styled.a`
  color: #dae2df;
  font-family: "Merriweather", serif;
  &:hover {
    color: #a2a7a5;
    border-color: transparent !important;
  }
  &:focus {
    color: #a2a7a5;
    border-color: transparent !important;
  }
`;

const TabBar = props => (
  <div className="row">
    <ul className="nav nav-tabs">
      <Tab
        className="nav-item"
        onClick={props.switchPage.bind(this, "displayResults")}
      >
        <NavLink className="nav-link" href="#">
          Article
        </NavLink>
      </Tab>
      <Tab
        className="nav-item"
        onClick={props.switchPage.bind(this, "analytics")}
      >
        <NavLink className="nav-link" href="#">
          Analytics
        </NavLink>
      </Tab>
    </ul>
  </div>
);
TabBar.propTypes = {
  switchPage: PropTypes.func.isRequired
};

const Card = props => (
  <div className="card">
    <div className="card-block">
      <h4 className="card-title">{props.title}</h4>
      <p>{props.children}</p>
    </div>
  </div>
);

const colorMap = {
  en: "#b0413e",
  fr: "#05668d",
  de: "#548687",
  zh: "#3c91e6",
  nor: "#f29559"
};

const LangSquare = styled.span`
  background-color: ${props => colorMap[props.language] || `white`} ;
  color: white;
}
`;

class Analytics extends React.Component {
  render() {
    return (
      <div>
        <Card title="Bar Graph">Hello</Card>
        <Card title="Pie Graph">Hello</Card>
        <Card title="Another Graph">Hello</Card>
      </div>
    );
  }
}
class QueryResults extends React.Component {
  switchPage(view) {
    this.props.dispatch({
      type: "CHANGE_PAGE",
      view
    });
  }
  getContents() {
    switch (this.props.view) {
      case "displayResults": {
        return (
          <div className="row">
            <div className="col-6 offset-3">
              <p>{this.props.results.content}</p>
            </div>
          </div>
        );
      }
      case "analytics": {
        return <Analytics />;
      }
    }
  }
  render() {
    return (
      <div className={"container"}>
        <TabBar switchPage={this.switchPage.bind(this)} />
        {this.getContents()}
      </div>
    );
  }
}

QueryResults.propTypes = {
  dispatch: PropTypes.func,
  view: PropTypes.string,
  results: PropTypes.object
};

function mapStateToProps(state) {
  return {
    results: state.results,
    view: state.view
  };
}

const Connected = connect(mapStateToProps)(QueryResults);
export default Connected;
