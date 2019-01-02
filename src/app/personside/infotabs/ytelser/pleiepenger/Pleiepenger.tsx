import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { getSistePeriodeForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato, genericAscendingDateComparator } from '../../../../../utils/dateUtils';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

export const TittelStyle = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px20} ${theme.margin.px10};
`;

function Pleiepenger(props: Props) {

    const gjeldendePeriode = getSistePeriodeForPleiepengerettighet(props.pleiepenger);
    const sortertePerioder = props.pleiepenger.perioder.sort(genericAscendingDateComparator(p => p.fom)).reverse();

    return (
        <>
            <TittelStyle><Undertittel>
                Pleiepenger sykt barn - {formaterDato(gjeldendePeriode.fom)}
            </Undertittel></TittelStyle>
            <Oversikt pleiepenger={props.pleiepenger}/>
            <ol>
                {sortertePerioder.map((periode, index) =>
                    <Pleiepengerperiode periodeNummer={sortertePerioder.length - index} key={index} periode={periode}/>
                )}
            </ol>
        </>
    );
}

export default Pleiepenger;
