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
import VergemålLogo from '../../../../../svg/Utropstegn';

const emdash = '\u2014';

function Periode(props: {periode: Periode}) {
    const {periode} = props;

    const fom = periode.fom ? formaterDato(periode.fom) : '';
    const tom = periode.tom ? formaterDato(periode.tom) : '';

    return(
        <EtikettLiten>{fom} {emdash} {tom}</EtikettLiten>
    );
}

const Vergeinformasjon = styled.div`
  padding-bottom: .5em;
`;

const VergeDiv = styled.div`
  padding-bottom: 1.5em;
`;

function Verge(props: {verge: Verge}) {
    const {verge} = props;
    return (
        <VisittkortElement beskrivelse="Verge" ikon={<VergemålLogo />}>
            <VergeDiv>
                <Vergeinformasjon>
                    <Undertekst>{verge.navn.sammensatt}</Undertekst>
                    <Undertekst>{verge.ident}</Undertekst>
                    <Undertekst>{verge.vergetype ? verge.vergetype.value : ''}</Undertekst>
                </Vergeinformasjon>
                <UndertekstBold>{verge.vergesakstype ? verge.vergesakstype.value : ''}</UndertekstBold>
                <Undertekst>{verge.mandattype ? verge.mandattype.value : ''}</Undertekst>
                <Undertekst>{verge.mandattekst || ''}</Undertekst>
                <Undertekst>{verge.embete ? verge.embete.value : ''}</Undertekst>
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