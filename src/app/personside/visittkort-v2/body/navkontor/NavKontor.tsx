import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import EtikettGraa from '../../../../../components/EtikettGraa';
import VisittkortElement from '../VisittkortElement';
import NavLogo from '../../../../../svg/NavLogo';
import { hentBaseUrl } from '../../../../../redux/restReducers/baseurls';
import { VisittkortGruppe } from '../VisittkortStyles';
import { Enhet, Publikumsmottak as PublikumsmottakInterface } from '../../PersondataDomain';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';
import AdresseInfo from '../AdresseInfo';
import { capitalizeName } from '../../../../../utils/string-utils';

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
    navEnhet: Enhet | null;
}

function PublikumsmottakKontaktInfo(props: { publikumsmottak: PublikumsmottakInterface }) {
    const apningstider = props.publikumsmottak.apningstider.map(apningstid => {
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

function NavKontor({ navEnhet }: Props) {
    const baseUrlResource = useRestResource(resources => resources.baseUrl);
    const baseUrl = baseUrlResource.data ? hentBaseUrl(baseUrlResource.data, 'norg2-frontend') : '';

    if (!navEnhet) {
        return null;
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
