import * as React from 'react';
import styled from 'styled-components/macro';

import { Normaltekst } from 'nav-frontend-typografi';

import VisittkortElement from '../VisittkortElement';
import { Verge as VergeInterface } from '../../PersondataDomain';
import { formaterDato } from '../../../../../utils/string-utils';
import VergemalLogo from '../../../../../svg/Utropstegn';
import EtikettGraa from '../../../../../components/EtikettGraa';
import { ENDASH } from '../../../../../utils/string-utils';
import { VisittkortGruppe } from '../VisittkortStyles';
import { Element } from 'nav-frontend-typografi';
import { hentNavn } from '../../utils-visittkort';

function getPeriodeTekst(gyldighetstidspunkt: string | null, opphoerstidspunkt?: string | null) {
    const fom = gyldighetstidspunkt ? formaterDato(gyldighetstidspunkt) : '';
    const tom = opphoerstidspunkt ? formaterDato(opphoerstidspunkt) : '';

    return `${fom} ${ENDASH} ${tom}`;
}

const Vergeinformasjon = styled.div`
    margin-bottom: 5px;
`;

interface Props {
    vergemal: VergeInterface[];
}

function Verge(props: { verge: VergeInterface }) {
    const { verge } = props;

    return (
        <VisittkortElement beskrivelse={'Verge'}>
            <Vergeinformasjon>
                <Normaltekst>{verge.navn ? hentNavn(verge.navn) : 'Navn ikke tilgjengelig'}</Normaltekst>
                <Normaltekst>{verge.ident || ''}</Normaltekst>
            </Vergeinformasjon>

            <Element>Omfang</Element>
            <Normaltekst>{verge.omfang}</Normaltekst>
            <EtikettGraa>
                {verge.embete ? verge.embete : ''}
                {verge.embete ? <br /> : ''}
                {getPeriodeTekst(verge.gyldighetstidspunkt, verge.opphoerstidspunkt)}
            </EtikettGraa>
        </VisittkortElement>
    );
}

function Vergesakstype({ vergemal }: Props) {
    const alleVergesakstyper = vergemal.map(verge => verge.vergesakstype);
    const unikeVergessakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <Normaltekst>{unikeVergessakstyper}</Normaltekst>;
}

function Vergemal({ vergemal }: Props) {
    if (vergemal.isEmpty()) {
        return null;
    }

    const verger = vergemal.map((verge, index) => <Verge verge={verge} key={index} />);
    return (
        <VisittkortGruppe ikon={<VergemalLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype vergemal={vergemal} />
            {verger}
        </VisittkortGruppe>
    );
}

export default Vergemal;
