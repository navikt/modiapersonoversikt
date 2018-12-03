import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';

interface Props {
    foreldrePengerResponse: ForeldrepengerResponse;
}

const TittelStyle = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px20} ${theme.margin.px10};
`;

function Foreldrepenger(props: Props) {

    const foreldrepenger = props.foreldrePengerResponse.foreldrepenger;

    if (foreldrepenger === null) {
        return <AlertStripeInfo>Finner ingen foreldrepengerettigheter for bruker</AlertStripeInfo>;
    }

    const perioder = foreldrepenger.periode.map((periode, index) =>
        <ForeldrepengePeriode key={index} periode={periode}/>
    );

    return (
        <>
            <TittelStyle><Undertittel>Foreldrepenger</Undertittel></TittelStyle>
            <Oversikt foreldrePenger={foreldrepenger}/>
            <ul>
                {perioder}
            </ul>
        </>
    );
}

export default Foreldrepenger;
