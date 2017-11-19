import React from "react";
import styled from "styled-components";

import UrlSubmitForm from "./urlSubmitForm.js";
import QueryResults from "./queryResults.js";

export default function App() {
  return (
    <MainContainer>
      <TitleContainer>
        <MainTitle>Etymology Scraper</MainTitle>
      </TitleContainer>
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

const TitleContainer = styled.div`
  font-family: "Lato", sans-serif;
  text-align: center;
  margin: 100px 0;
  color: #c0c0c0c;
`;

const MainTitle = styled.h1`
  font-size: 3em;
`;
