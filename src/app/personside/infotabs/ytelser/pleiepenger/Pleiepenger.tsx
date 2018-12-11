import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { getSistePeriodeForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/dateUtils';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

export const TittelStyle = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px20} ${theme.margin.px10};
`;

function Pleiepenger(props: Props) {

    const gjeldendePeriode = getSistePeriodeForPleiepengerettighet(props.pleiepenger);

    return (
        <>
            <TittelStyle><Undertittel>
                Pleiepenger sykt barn - ID-dato - {formaterDato(gjeldendePeriode.fom)}
            </Undertittel></TittelStyle>
            <Oversikt pleiepenger={props.pleiepenger}/>
            <ol>
                {props.pleiepenger.perioder.map((periode, index) =>
                    <Pleiepengerperiode key={index} periode={periode}/>
                )}
            </ol>
        </>
    );
}

export default Pleiepenger;
