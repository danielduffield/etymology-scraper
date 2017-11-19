import React from "react";
import styled from "styled-components";

import UrlSubmitForm from "./urlSubmitForm.js";
import QueryResults from "./queryResults.js";

export default function App() {
  return (
    <MainContainer>
      <UrlSubmitForm />
      <QueryResults />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
