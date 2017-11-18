import React from 'react'
import styled from 'styled-components'

export default class UrlSubmitForm extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <StyledRow className="row">
          <div className="col-6 offset-3">
            <p>URL SUBMIT FORM</p>
          </div>
        </StyledRow>
      </div>
    )
  }
}

const StyledRow = styled.div`
  background-color: yellow;
`
