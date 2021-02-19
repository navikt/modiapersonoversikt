import * as React from 'react';
import styled from 'styled-components/macro';

import { Normaltekst } from 'nav-frontend-typografi';

import VisittkortElement from '../VisittkortElement';
import { Verge as VergeInterface, Vergemal as VergemalInterface } from '../../../../../models/vergemal/vergemal';
import { formaterDato } from '../../../../../utils/string-utils';
import VergemålLogo from '../../../../../svg/Utropstegn';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { ENDASH } from '../../../../../utils/string-utils';
import { Vergesakstype } from './Vergesakstype';
import { VisittkortGruppe } from '../VisittkortStyles';
import { Element } from 'nav-frontend-typografi';

function getPeriodeTekst(gyldighetstidspunkt?: string, opphoerstidspunkt?: string) {
    const fom = gyldighetstidspunkt ? formaterDato(gyldighetstidspunkt) : '';
    const tom = opphoerstidspunkt ? formaterDato(opphoerstidspunkt) : '';

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
                <Normaltekst>{verge.navn ? verge.navn.sammensatt : 'Navn ikke tilgjengelig'}</Normaltekst>
                <Normaltekst>{verge.ident || ''}</Normaltekst>
            </Vergeinformasjon>

            <Element>Omfang</Element>
            <Normaltekst>{verge.omfang ? verge.omfang : 'Ikke oppgitt'}</Normaltekst>
            <EtikettGrå>
                {verge.embete ? verge.embete : ''}
                {verge.embete ? <br /> : ''}
                {getPeriodeTekst(verge.gyldighetstidspunkt, verge.opphoerstidspunkt)}
            </EtikettGrå>
        </VisittkortElement>
    );
}

function Vergemal(props: { vergemal?: VergemalInterface }) {
    if (!props.vergemal || props.vergemal.verger.length === 0) {
        return null;
    }
    const verger = props.vergemal.verger.map((verge, index) => <Verge verge={verge} key={index} />);
    return (
        <VisittkortGruppe ikon={<VergemålLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype verger={props.vergemal.verger} />
            {verger}
        </VisittkortGruppe>
    );
}

function VergemalWrapper(props: { vergemal?: VergemalInterface }) {
    if (!props.vergemal || props.vergemal.verger.length === 0) {
        return null;
    }

    return <Vergemal vergemal={props.vergemal} />;
}

export default VergemalWrapper;
