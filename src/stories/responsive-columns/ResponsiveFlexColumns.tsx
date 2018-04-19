import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';

const dummyDivs = (
    <>
        <ComponentPlaceholder key={'Kontaktinfo'} name={'Kontaktinfo'} height={'600px'}/>
        <ComponentPlaceholder key={'Familie'} name={'Familie'} height={'450px'}/>
        <ComponentPlaceholder key={'NavKontor'} name={'NavKontor'} height={'350px'}/>
        <ComponentPlaceholder key={'Bruker er under vergemål'} name={'Bruker er under vergemål'} height={'300px'}/>
        <ComponentPlaceholder key={'Sikkerhetstiltak'} name={'Sikkerhetstiltak'} height={'200px'}/>
    </>
);

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  > * {
    margin: 0.5em;
    width: 47% !important;
    @media(min-width: 1024px){
      width: 31% !important;
    }
    @media(min-width: 1440px){
      width: 23% !important;
    }
    flex-grow: 0 !important;
    box-sizing: border-box;
  }
`;

function ResponsiveFlexColumns() {
    return (
        <Wrapper>
            {dummyDivs}
        </Wrapper>
    );
}

export default ResponsiveFlexColumns;
