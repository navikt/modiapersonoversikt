import * as React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import { Verge as VergeInterface } from '../../PersondataDomain';
import VergemalLogo from '../../../../../svg/Utropstegn';
import EtikettGraa from '../../../../../components/EtikettGraa';
import { VisittkortGruppe } from '../VisittkortStyles';
import { Element } from 'nav-frontend-typografi';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';

const Vergeinformasjon = styled.div`
    margin-bottom: 5px;
`;

interface Props {
    vergemal: VergeInterface[];
}

function Verge(props: { verge: VergeInterface }) {
    const { verge } = props;

    return (
        <VisittkortElement beskrivelse="Verge">
            <Vergeinformasjon>
                <Normaltekst>{hentNavn(verge.navn, 'Navn ikke tilgjengelig')}</Normaltekst>
                <Normaltekst>{verge.ident}</Normaltekst>
            </Vergeinformasjon>
            <Element>Omfang</Element>
            <Normaltekst>{verge.omfang}</Normaltekst>
            <EtikettGraa>
                {verge.embete}
                {verge.embete ? <br /> : ''}
            </EtikettGraa>
            <GyldighetsPeriode gyldighetsPeriode={verge.gyldighetsPeriode} />
        </VisittkortElement>
    );
}

function Vergesakstype({ vergemal }: Props) {
    const alleVergesakstyper = vergemal.map(verge => verge.vergesakstype);
    const unikeVergessakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <Normaltekst>Vergesakstyper: {unikeVergessakstyper}</Normaltekst>;
}

function Vergemal({ vergemal }: Props) {
    if (vergemal.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<VergemalLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype vergemal={vergemal} />
            {vergemal.map((verge, index) => (
                <Verge verge={verge} key={index} />
            ))}
        </VisittkortGruppe>
    );
}

export default Vergemal;
