import * as React from 'react';
import styled from 'styled-components';

const UnderArbeidDiv = styled.div`
      position: fixed;
      width: 300px;
      top: 32px;
      left: -94px;
      transform: rotate(-45deg);
      opacity: 0.7;
      padding: 0.5em;
      background-color: red;
      color: white;
      text-align: center;
      font-size: 1.2rem;
      font-family: cursive;
      pointer-events: none;
      z-index: 1000;
      @media print {
        display: none;
      }
    `;

function UnderArbeid() {
    return (
        <UnderArbeidDiv role="region" aria-label="Under arbeid">
            Under Arbeid
        </UnderArbeidDiv>
    );
}

export default UnderArbeid;
