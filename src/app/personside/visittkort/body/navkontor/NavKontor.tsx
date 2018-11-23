import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { BrukersNavKontorResponse, NavKontor, PublikumsMottak } from '../../../../../models/navkontor';
import { Klokkeslett } from '../../../../../models/klokkeslett';
import EtikettGrå from '../../../../../components/EtikettGrå';
import VisittkortElement from '../VisittkortElement';
import NavLogo from '../../../../../svg/NavLogo';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrl } from '../../../../../redux/restReducers/baseurls';
import { ENDASH } from '../../../../../utils/string-utils';

const NameCase = styled.span`
  text-transform: capitalize;
`;

const ApningsTiderListe = styled.dl`
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

function padMedNull(streng: string) {
    return streng.length === 1 ? `0${streng}` : streng;
}

function klokkeslettToString(klokkeslett: Klokkeslett) {
    return `${padMedNull(klokkeslett.time)}.${padMedNull(klokkeslett.minutt)}`;
}

function publikumsMottakKontaktInfo(publikumsMottak: PublikumsMottak) {
    const apningstider = publikumsMottak.apningstider.map((apningstid) => (
        <Fragment key={apningstid.ukedag}>
            <dt>
                <Normaltekst>
                    <NameCase>
                        {apningstid.ukedag.toLowerCase()}
                    </NameCase>
                </Normaltekst>
            </dt>
            <dd>
                <Normaltekst>
                    {klokkeslettToString(apningstid.apentFra)} {ENDASH} {klokkeslettToString(apningstid.apentTil)}
                </Normaltekst>
            </dd>
        </Fragment>
    ));

    const besoksadresse = publikumsMottak.besoksadresse;

    const adresse = besoksadresse
        ? `
            ${besoksadresse.gatenavn} ${besoksadresse.husnummer || '' }${besoksadresse.husbokstav || ''}`
        : 'Adresse ikke funnet';
    const postSted = besoksadresse ? `${besoksadresse.postnummer} ${besoksadresse.poststed}` : '';

    return (
        <div key={adresse}>
            <br/>
            <EtikettGrå>Besøksadresse</EtikettGrå>
            <Normaltekst>{adresse}</Normaltekst>
            <Normaltekst>{postSted}</Normaltekst>
            <br/>
            <EtikettGrå>Åpningstider</EtikettGrå>
            <ApningsTiderListe>
                {apningstider}
            </ApningsTiderListe>
            <br/>
        </div>
    );
}

function flerePublikumsmottak(antallMottak: number) {
    if (antallMottak > 1) {
        return (
            <>
                <Normaltekst>Det finnes flere publikumsmottak</Normaltekst>
                <br/>
            </>
        );
    }
    return null;
}

function Publikumsmottak(props: { publikumsmottak: PublikumsMottak[] }) {
    const antallPublikumsmottak = props.publikumsmottak.length;
    if (antallPublikumsmottak === 0) {
        return <Normaltekst>Ingen publikumsmottak</Normaltekst>;
    }

    const førstePublikumsmottak = props.publikumsmottak[0];
    return (
        <>
            {publikumsMottakKontaktInfo(førstePublikumsmottak)}
            {flerePublikumsmottak(antallPublikumsmottak)}
        </>
    );
}

function navkontorInfo(navKontor: NavKontor, norg2Url: string) {
    return (
        <>
            <Publikumsmottak publikumsmottak={navKontor.publikumsmottak}/>
            <a
                href={`${norg2Url}/#/startsok?enhetNr=${navKontor.enhetId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lenke"
            >
                <Normaltekst tag="span">
                    Mer informasjon om kontoret
                </Normaltekst>
            </a>
        </>
    );
}

function IngenNavKontor() {
    return (
        <VisittkortElement beskrivelse="Ingen enhet" ikon={<NavLogo/>}>
            <br/>
        </VisittkortElement>
    );
}

function NavKontorVisning(props: {
    brukersNavKontorResponse: BrukersNavKontorResponse,
    baseUrlsResponse: BaseUrlsResponse
}) {
    const navKontor = props.brukersNavKontorResponse.navKontor;
    if (!navKontor) {
        return <IngenNavKontor/>;
    }

    const beskrivelse = `${navKontor.enhetId} ${navKontor.enhetNavn}`;

    const norg2Url = hentNorg2Url(props.baseUrlsResponse);

    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<NavLogo/>}>
            {navkontorInfo(navKontor, norg2Url)}
        </VisittkortElement>
    );
}

function hentNorg2Url(baseUrlsResponse: BaseUrlsResponse) {
    return hentBaseUrl(baseUrlsResponse, 'norg2-frontend');
}

export default NavKontorVisning;
