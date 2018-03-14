import * as React from 'react';
import styled from 'styled-components';

function UnderArbeid() {

    const UnderArbeidDiv = styled.div`
      position: fixed;
      width: 300px;
      top: 41px;
      left: -71px;
      transform: rotate(-45deg);
      opacity: 0.7;
      padding: 0.5em;
      background-color: red;
      color: white;
      text-align: center;
      font-size: 1.5rem;
      font-family: cursive;
      pointer-events: none;
      z-index: 1000;
    `;

    return (
        <UnderArbeidDiv>
            Under Arbeid
        </UnderArbeidDiv>
    );
}

export default UnderArbeid;
