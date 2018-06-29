import * as React from 'react';
import styled from 'styled-components';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement, { TittelStyle } from '../VisittkortElement';
import { Periode, Verge, Vergemal } from '../../../../../models/vergemal/vergemal';
import { formaterDato } from '../../../../../utils/dateUtils';
import VergemålLogo from '../../../../../svg/Utropstegn';
import EtikettMini from '../../../../../components/EtikettMini';
import { ENDASH } from '../../../../../utils/string-utils';
import { Vergesakstype } from './Vergesakstype';
import { VisittkortGruppe } from '../VisittkortStyles';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';

function Periode(props: { periode: Periode }) {
    const { periode } = props;

    const fom = periode.fom ? formaterDato(periode.fom) : '';
    const tom = periode.tom ? formaterDato(periode.tom) : '';

    return (
        <EtikettMini>{fom} {ENDASH} {tom}</EtikettMini>
    );
}

const Vergeinformasjon = styled.div`
  margin-bottom: 5px;
`;

function Verge(props: { verge: Verge }) {
    const { verge } = props;
    return (
        <VisittkortElement beskrivelse={'Verge'}>

            <Vergeinformasjon>
                <Undertekst>{verge.navn ? verge.navn.sammensatt : 'Fødselsnummer ikke oppgitt'}</Undertekst>
                <Undertekst>{verge.ident || ''}</Undertekst>
                <Undertekst>{verge.vergetype ? verge.vergetype.beskrivelse : ''}</Undertekst>
            </Vergeinformasjon>

            <EtikettLiten><TittelStyle>Mandat</TittelStyle></EtikettLiten>
            <Undertekst>{verge.mandattype ? verge.mandattype.beskrivelse : 'Ikke oppgitt'}</Undertekst>
            <Undertekst>{verge.mandattekst || ''}</Undertekst>
            <EtikettMini>{verge.embete ? verge.embete.beskrivelse : ''}</EtikettMini>
            <Periode periode={verge.virkningsperiode}/>

        </VisittkortElement>
    );
}

function Vergemal(props: { vergemal: Vergemal }) {
    const verger = props.vergemal.verger.map((verge, index) =>
        <Verge verge={verge} key={index}/>);
    return (
        <VisittkortGruppe ikon={<VergemålLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype verger={props.vergemal.verger}/>
            {verger}
        </VisittkortGruppe>
    );
}

function VergemalWrapper(props: { vergemal: Vergemal }) {
    if (props.vergemal.verger.length === 0) {
        return null;
    }

    return (
        <Vergemal vergemal={props.vergemal}/>
    );

}

export default VergemalWrapper;