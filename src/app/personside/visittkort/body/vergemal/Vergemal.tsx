import * as React from 'react';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import VisittkortElement from '../VisittkortElement';
import {
    Periode,
    Verge as VergeInterface,
    Vergemal as VergemalInterface
} from '../../../../../models/vergemal/vergemal';
import { formaterDato } from '../../../../../utils/stringFormatting';
import VergemålLogo from '../../../../../svg/Utropstegn';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { ENDASH } from '../../../../../utils/string-utils';
import { Vergesakstype } from './Vergesakstype';
import { VisittkortGruppe } from '../VisittkortStyles';
import { Element } from 'nav-frontend-typografi';

function getPeriodeTekst(periode: Periode) {
    const fom = periode.fom ? formaterDato(periode.fom) : '';
    const tom = periode.tom ? formaterDato(periode.tom) : '';

    return `${fom} ${ENDASH} ${tom}`;
}

const Vergeinformasjon = styled.div`
    margin-bottom: 5px;
`;

function Verge(props: { verge: VergeInterface }) {
    const { verge } = props;
    return (
        <VisittkortElement beskrivelse={'Verge'}>
            <Vergeinformasjon>
                <Normaltekst>{verge.navn ? verge.navn.sammensatt : 'Fødselsnummer ikke oppgitt'}</Normaltekst>
                <Normaltekst>{verge.ident || ''}</Normaltekst>
                <Normaltekst>{verge.vergetype ? verge.vergetype.beskrivelse : ''}</Normaltekst>
            </Vergeinformasjon>

            <Element>Mandat</Element>
            <Normaltekst>{verge.mandattype ? verge.mandattype.beskrivelse : 'Ikke oppgitt'}</Normaltekst>
            <Normaltekst>{verge.mandattekst || ''}</Normaltekst>
            <EtikettGrå>
                {verge.embete ? verge.embete.beskrivelse : ''}
                {verge.embete ? <br /> : ''}
                {getPeriodeTekst(verge.virkningsperiode)}
            </EtikettGrå>
        </VisittkortElement>
    );
}

function Vergemal(props: { vergemal: VergemalInterface }) {
    const verger = props.vergemal.verger.map((verge, index) => <Verge verge={verge} key={index} />);
    return (
        <VisittkortGruppe ikon={<VergemålLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype verger={props.vergemal.verger} />
            {verger}
        </VisittkortGruppe>
    );
}

function VergemalWrapper(props: { vergemal: VergemalInterface }) {
    if (props.vergemal.verger.length === 0) {
        return null;
    }

    return <Vergemal vergemal={props.vergemal} />;
}

export default VergemalWrapper;
