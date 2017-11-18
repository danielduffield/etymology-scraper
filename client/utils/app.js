import React from "react";
import styled from "styled-components";

import UrlSubmitForm from "./urlSubmitForm.js";
import ResultsPage from "./resultsPage.js";

export default function App() {
  return (
    <MainContainer>
      <TitleContainer>
        <MainTitle>Etymology Scraper</MainTitle>
      </TitleContainer>
      <UrlSubmitForm />
      <ResultsPage />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin: 100px 0;
`;

const MainTitle = styled.h1`
  font-size: 3em;
`;
