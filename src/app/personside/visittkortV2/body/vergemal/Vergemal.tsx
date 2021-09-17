import * as React from 'react';

import { ENDASH, formaterDato } from '../../../../../utils/string-utils';
import styled from 'styled-components/macro';
import { Verge as VergeInterface } from '../../../../../models/personPdl/verge';
import VisittkortElement from '../VisittkortElement';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { vergeOmfangMapper } from './VergemalMapper';
import EtikettGraa from '../../../../../components/EtikettGraa';
import { VisittkortGruppe } from '../VisittkortStyles';
import VergemalLogo from '../../../../../svg/Utropstegn';
import Vergesakstype from './Vergesakstype';

function getPeriodeTekst(gyldighetstidspunkt?: string, opphoerstidspunkt?: string | null) {
    const fom = gyldighetstidspunkt ? formaterDato(gyldighetstidspunkt) : '';
    const tom = opphoerstidspunkt ? formaterDato(opphoerstidspunkt) : '';

    return `${fom} ${ENDASH} ${tom}`;
}

const Vergeinformasjon = styled.div`
    margin-bottom: 5px;
`;

function Verge(props: { verge: VergeInterface }) {
    const { verge } = props;

    const gyldighetstidspunkt = verge.gyldighetstidspunkt ? formaterDato(verge.gyldighetstidspunkt) : undefined;
    const opphoerstidspunkt = verge.opphoerstidspunkt ? formaterDato(verge.opphoerstidspunkt) : undefined;

    return (
        <VisittkortElement beskrivelse={'Verge'}>
            <Vergeinformasjon>
                <Normaltekst>
                    {verge.navn ? `${verge.navn.fornavn} ${verge.navn.etternavn}` : 'Navn ikke tilgjengelig'}
                </Normaltekst>
                <Normaltekst>{verge.ident || ''}</Normaltekst>
            </Vergeinformasjon>

            <Element>Omfang</Element>
            <Normaltekst>{vergeOmfangMapper[verge.omfang ?? 'undefined'] ?? verge.omfang}</Normaltekst>
            <EtikettGraa>
                {verge.embete ? verge.embete : ''}
                {verge.embete ? <br /> : ''}
                {getPeriodeTekst(gyldighetstidspunkt, opphoerstidspunkt)}
            </EtikettGraa>
        </VisittkortElement>
    );
}

function Vergemal(props: { vergemal: VergeInterface[] }) {
    const verger = props.vergemal.map((verge, index) => <Verge verge={verge} key={index} />);
    return (
        <VisittkortGruppe ikon={<VergemalLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype verger={props.vergemal} />
            {verger}
        </VisittkortGruppe>
    );
}

function VergemalWrapper(props: { vergemal: VergeInterface[] }) {
    if (props.vergemal.length === 0) {
        return null;
    }

    return <Vergemal vergemal={props.vergemal} />;
}

export default VergemalWrapper;
