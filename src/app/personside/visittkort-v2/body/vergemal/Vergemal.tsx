import * as React from 'react';
import styled from 'styled-components/macro';
import { Element, Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import { InformasjonElement, Verge as VergeInterface } from '../../PersondataDomain';
import VergemalLogo from '../../../../../svg/Utropstegn';
import EtikettGraa from '../../../../../components/EtikettGraa';
import { VisittkortGruppe } from '../VisittkortStyles';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';

const Vergeinformasjon = styled.div`
    margin-bottom: 5px;
`;

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    vergemal: VergeInterface[];
}

function Verge(props: { feilendeSystemer: Array<InformasjonElement>; verge: VergeInterface }) {
    const { verge } = props;
    const harFeilendeSystemOgIngenNavn =
        harFeilendeSystemer(props.feilendeSystemer, InformasjonElement.PDL_TREDJEPARTSPERSONER) && !verge.navn ? (
            <Feilmelding>Feilet ved uthenting av navn på verge</Feilmelding>
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

function Vergemal({ feilendeSystemer, vergemal }: Props) {
    if (vergemal.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe ikon={<VergemalLogo />} tittel="Bruker er under vergemål">
            <Vergesakstype vergemal={vergemal} />
            {vergemal.map((verge, index) => (
                <Verge feilendeSystemer={feilendeSystemer} verge={verge} key={index} />
            ))}
        </VisittkortGruppe>
    );
}

export default Vergemal;
