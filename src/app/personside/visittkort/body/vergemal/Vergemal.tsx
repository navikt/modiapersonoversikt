import * as React from 'react';
import styled from 'styled-components';

import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement, { TittelStyle } from '../VisittkortElement';
import { Periode, Verge, Vergemal } from '../../../../../models/vergemal/vergemal';
import { formaterDato } from '../../../../../utils/dateUtils';
import VergemålLogo from '../../../../../svg/Utropstegn';
import EtikettMini from '../../../../../components/EtikettMini';
import { ENDASH } from '../../../../../utils/string-utils';

export const feilmelding = 'Feil ved visning av vergemål';

function Periode(props: {periode: Periode}) {
    const {periode} = props;

    const fom = periode.fom ? formaterDato(periode.fom) : '';
    const tom = periode.tom ? formaterDato(periode.tom) : '';

    return(
        <EtikettMini>{fom} {ENDASH} {tom}</EtikettMini>
    );
}

const Vergeinformasjon = styled.div`
  padding-bottom: .5em;
`;

const VergeDiv = styled.div`
  margin-top: 1em;
  padding-bottom: 1.5em;
`;

const Vergesakstype = styled.span`
  display: block;
`;

function Verge(props: {verge: Verge}) {
    const {verge} = props;
    return (
        <VergeDiv>
            <EtikettLiten><TittelStyle>Verge</TittelStyle></EtikettLiten>
            <Vergeinformasjon>
                <Undertekst>{verge.navn.sammensatt}</Undertekst>
                <Undertekst>{verge.ident}</Undertekst>
                <Undertekst>{verge.vergetype ? verge.vergetype.beskrivelse : ''}</Undertekst>
            </Vergeinformasjon>
            <EtikettLiten><TittelStyle>Mandat</TittelStyle></EtikettLiten>
            <Undertekst>{verge.mandattype ? verge.mandattype.beskrivelse : ''}</Undertekst>
            <Undertekst>{verge.mandattekst || ''}</Undertekst>
            <EtikettMini>{verge.embete ? verge.embete.beskrivelse : ''}</EtikettMini>
            <Periode periode={verge.virkningsperiode}/>
        </VergeDiv>
    );
}

function Vergemal(props: {vergemal: Vergemal}) {
    const alleVergesakstyper = props.vergemal.verger.map(verge => verge.vergesakstype ?
        verge.vergesakstype.beskrivelse : 'Ingen vergesakstype oppgitt').join(', ');
    const verger = props.vergemal.verger.map(verge =>
        <Verge verge={verge} key={verge.ident}/>);
    return (
        <VisittkortElement
            beskrivelse={'Bruker er under vergemål'}
            ikon={<VergemålLogo />}
            type={'header'}
        >
            <>
                <Vergesakstype>
                    <Undertekst>{alleVergesakstyper}</Undertekst>
                </Vergesakstype>
                {verger}
            </>
        </VisittkortElement>
    );
}

function VergemalWrapper(props: {vergemal?: Vergemal}) {
    if (!props.vergemal) {
        return <p>{feilmelding}</p>;
    }

    if (props.vergemal.verger.length === 0) {
        return null;
    }

    return (
        <Vergemal vergemal={props.vergemal}/>
    );

}

export default VergemalWrapper;