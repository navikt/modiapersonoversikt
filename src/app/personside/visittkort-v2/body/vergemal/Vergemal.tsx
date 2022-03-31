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
import FeilendeSystemAdvarsel from '../../FeilendeSystemAdvarsel';

const Vergeinformasjon = styled.div`
    margin-bottom: 5px;
`;

interface Props {
    feilendeSystem: boolean;
    vergemal: VergeInterface[];
}

function Verge(props: { feilendeSystem: boolean; verge: VergeInterface }) {
    const { verge } = props;
    const harFeilendeSystemOgIngenNavn =
        props.feilendeSystem && !verge.navn ? (
            <FeilendeSystemAdvarsel>Feilet ved uthenting av navn på verge</FeilendeSystemAdvarsel>
        ) : (
            <Normaltekst>{hentNavn(verge.navn, 'Navn ikke tilgjengelig')}</Normaltekst>
        );

    return (
        <VisittkortElement beskrivelse="Verge">
            <Vergeinformasjon>
                {harFeilendeSystemOgIngenNavn}
                <Normaltekst>{verge.ident}</Normaltekst>
            </Vergeinformasjon>
            <Element>Omfang</Element>
            <Normaltekst>{verge.omfang}</Normaltekst>
            <EtikettGraa>{verge.embete}</EtikettGraa>
            <GyldighetsPeriode gyldighetsPeriode={verge.gyldighetsPeriode} />
        </VisittkortElement>
    );
}

function Vergesakstype(props: { vergemal: VergeInterface[] }) {
    const alleVergesakstyper = props.vergemal.map((verge) => verge.vergesakstype);
    const unikeVergessakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return <Normaltekst>Vergesakstyper: {unikeVergessakstyper}</Normaltekst>;
}

function Vergemal({ feilendeSystem, vergemal }: Props) {
    if (vergemal.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<VergemalLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype vergemal={vergemal} />
            {vergemal.map((verge, index) => (
                <Verge feilendeSystem={feilendeSystem} verge={verge} key={index} />
            ))}
        </VisittkortGruppe>
    );
}

export default Vergemal;
