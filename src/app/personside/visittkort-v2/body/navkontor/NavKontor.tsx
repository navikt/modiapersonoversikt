import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components/macro';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import EtikettGraa from '../../../../../components/EtikettGraa';
import VisittkortElement from '../VisittkortElement';
import NavLogo from '../../../../../svg/NavLogo';
import { VisittkortGruppe } from '../VisittkortStyles';
import { Enhet, InformasjonElement, Publikumsmottak as PublikumsmottakInterface } from '../../PersondataDomain';
import AdresseInfo from '../AdresseInfo';
import { capitalizeName } from '../../../../../utils/string-utils';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import { mapUgyldigGT } from '../../visittkort-utils';
import baseurls from '../../../../../rest/resources/baseurlsResource';

const ApningstiderListe = styled.dl`
    margin: initial;
    padding: initial;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    dt {
        flex: 1 1 50%;
    }
    dd {
        flex: 2 2 50%;
        margin: 0;
    }
`;

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    navEnhet: Enhet | null;
    geografiskTilknytning: string | null;
}

function PublikumsmottakKontaktInfo(props: { publikumsmottak: PublikumsmottakInterface }) {
    const apningstider = props.publikumsmottak.apningstider.map((apningstid) => {
        return (
            <Fragment key={apningstid.ukedag}>
                <dt>
                    <Normaltekst>{capitalizeName(apningstid.ukedag)}</Normaltekst>
                </dt>
                <dd>
                    <Normaltekst>{apningstid.apningstid}</Normaltekst>
                </dd>
            </Fragment>
        );
    });

    return (
        <div>
            <br />
            <EtikettGraa>Besøksadresse</EtikettGraa>
            <AdresseInfo adresse={props.publikumsmottak.besoksadresse} />
            <br />
            <EtikettGraa>Åpningstider</EtikettGraa>
            <ApningstiderListe>{apningstider}</ApningstiderListe>
            <br />
        </div>
    );
}

function Publikumsmottak(props: { publikumsmottak: PublikumsmottakInterface[] }) {
    const publikumsmottak = props.publikumsmottak.firstOrNull();
    if (!publikumsmottak) {
        return <Normaltekst>Ingen publikumsmottak</Normaltekst>;
    }

    const flerePublikumsmottak =
        props.publikumsmottak.length > 1 ? (
            <>
                <Normaltekst>Det finnes flere publikumsmottak</Normaltekst>
                <br />
            </>
        ) : null;

    return (
        <>
            <PublikumsmottakKontaktInfo publikumsmottak={publikumsmottak} />
            {flerePublikumsmottak}
        </>
    );
}

function NavKontor({ feilendeSystemer, navEnhet, geografiskTilknytning }: Props) {
    const baseUrlResource = baseurls.useFetch();
    const baseUrl = baseUrlResource.data?.norg2Frontend ?? '';

    if (harFeilendeSystemer(feilendeSystemer, InformasjonElement.NORG_NAVKONTOR)) {
        return (
            <VisittkortGruppe tittel={'NAV-kontor'}>
                <VisittkortElement beskrivelse={'Ukjent NAV-kontor'} ikon={<NavLogo />}>
                    <Feilmelding>Feilet ved uthenting av informasjon om NAV-kontor</Feilmelding>
                </VisittkortElement>
            </VisittkortGruppe>
        );
    }

    if (geografiskTilknytning === null) {
        return null;
    } else if (navEnhet === null) {
        return (
            <VisittkortGruppe tittel={'NAV-kontor'}>
                <VisittkortElement beskrivelse={mapUgyldigGT(geografiskTilknytning)} ikon={<NavLogo />}>
                    <Feilmelding>Fant ikke geografisk tilknyttning for bruker</Feilmelding>
                </VisittkortElement>
            </VisittkortGruppe>
        );
    }

    const beskrivelse = `${navEnhet?.id} ${navEnhet.navn}`;
    return (
        <VisittkortGruppe tittel={'NAV-kontor'}>
            <VisittkortElement beskrivelse={beskrivelse} ikon={<NavLogo />}>
                <Publikumsmottak publikumsmottak={navEnhet.publikumsmottak} />
                <a
                    href={`${baseUrl}/#/startsok?enhetNr=${navEnhet.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lenke"
                >
                    <Normaltekst tag="span">Mer informasjon om kontoret</Normaltekst>
                </a>
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

export default NavKontor;
