import * as React from 'react';
import styled from 'styled-components';

import VisittkortElement from '../VisittkortElement';
import { Verge, Vergemal } from '../../../../../models/vergemal/vergemal';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';
import { formaterDato } from '../../../../../utils/dateUtils';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { Periode } from '../../../../../models/vergemal/vergemal';
import { InfoGruppe } from '../styledComponents';

const vergemålLogo = require('./vergemaal.svg');
const emdash = '\u2014';

function Periode(props: {periode: Periode}) {
    const {periode} = props;

    const fom = periode.fom ? formaterDato(periode.fom) : '';
    const tom = periode.tom ? formaterDato(periode.tom) : '';

    return(
        <EtikettLiten>{fom} {emdash} {tom}</EtikettLiten>
    );
}

const BasicVergeinformasjon = styled.div`
  padding-bottom: .5em;
`;

const VergeDiv = styled.div`
  padding-bottom: 1.5em;
`;

function Verge(props: {verge: Verge}) {
    const {verge} = props;
    return (
        <VisittkortElement beskrivelse="Verge" ikonPath={vergemålLogo}>
            <VergeDiv>
                <BasicVergeinformasjon>
                    <Undertekst>{verge.navn.sammensatt}</Undertekst>
                    <Undertekst>{verge.ident}</Undertekst>
                    <Undertekst>{verge.vergetype || ''}</Undertekst>
                </BasicVergeinformasjon>
                <UndertekstBold>{verge.vergesakstype || ''}</UndertekstBold>
                <Undertekst>{verge.mandattype || ''}</Undertekst>
                <Undertekst>{verge.mandattekst || ''}</Undertekst>
                <Undertekst>{verge.embete || ''}</Undertekst>
                <Periode periode={verge.virkningsperiode}/>
            </VergeDiv>
        </VisittkortElement>

    );
}

function Vergemal(props: {vergemal: Vergemal}) {
    const verger = props.vergemal.verger.map(verge => <Verge verge={verge} key={verge.ident}/>);
    return (
        <InfoGruppe tittel={'Bruker er under vergemål'}>
            {verger}
        </InfoGruppe>
    );
}

function VergemalWrapper(props: {vergemal?: Vergemal}) {
    if (!props.vergemal) {
        return <p>Feil ved visning av vergemål</p>;
    }

    if (props.vergemal.verger.length === 0) {
        return null;
    }

    return (
        <Vergemal vergemal={props.vergemal}/>
    );

}

export default VergemalWrapper;