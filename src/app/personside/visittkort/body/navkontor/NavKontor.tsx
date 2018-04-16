import * as React from 'react';
import { NavKontor, PublikumsMottak } from '../../../../../models/navkontor';
import styled from 'styled-components';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { Klokkeslett } from '../../../../../models/klokkeslett';
import { Undertekst } from 'nav-frontend-typografi';
import Lenke from '../../../../../components/Lenke';
import { Fragment } from 'react';

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
                <Undertekst>
                    <NameCase>
                        {apningstid.ukedag.toLowerCase()}
                    </NameCase>
                </Undertekst>
            </dt>
            <dd>
                <Undertekst>
                    {klokkeslettToString(apningstid.apentFra)} - {klokkeslettToString(apningstid.apentTil)}
                </Undertekst>
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
            <Undertekst>{adresse}</Undertekst>
            <Undertekst>{postSted}</Undertekst>
            <br/>
            <EtikettLiten>Åpningstider</EtikettLiten>
            <ApningsTiderListe>
                {apningstider}
            </ApningsTiderListe>
            <br/>
        </div>
    );
}

function NavKontorVisning(props: { navKontor?: NavKontor }) {
    if (!props.navKontor) {
        return <Undertekst>Ingen NAV-Enhet</Undertekst>;
    }

    const listeMedPublikumsMottak =
        props.navKontor.publikumsmottak.map((publikumsMottak) => publikumsMottakKontaktInfo(publikumsMottak));
    return (
        <>
            {listeMedPublikumsMottak}
            <Lenke>Dette er en lenke</Lenke>
        </>
    );
}

export default NavKontorVisning;
