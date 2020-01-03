import * as React from 'react';
import styled from 'styled-components/macro';

import AlertStripe from 'nav-frontend-alertstriper';

import { brukersNavnKanEndres } from './endrenavn/endrenavn-utils';
import { VeilederRoller } from '../../models/veilederRoller';
import { Person } from '../../models/person/person';
import {
    veilederHarPåkrevdRolleForEndreAdresse,
    veilederHarPåkrevdRolleForEndreKontonummer,
    veilederHarPåkrevdRolleForEndreNavn
} from '../../utils/RollerUtils';

const Luft = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
`;

function Infomelding(props: { children: string }) {
    return (
        <Luft>
            <AlertStripe type={'info'}>{props.children}</AlertStripe>
        </Luft>
    );
}

export function EndreNavnInfomeldingWrapper(props: { veilderRoller: VeilederRoller; person: Person }) {
    if (!veilederHarPåkrevdRolleForEndreNavn(props.veilderRoller)) {
        return <Infomelding>Du har ikke nødvendig rolle for å endre navn</Infomelding>;
    }

    if (!brukersNavnKanEndres(props.person)) {
        return (
            <Infomelding>
                Bruker har ikke D-nummer eller er ikke utvandret. Du kan derfor ikke endre navnet.
            </Infomelding>
        );
    }

    return null;
}

export function EndreAdresseInfomelding(props: { veilderRoller: VeilederRoller }) {
    if (!veilederHarPåkrevdRolleForEndreAdresse(props.veilderRoller)) {
        return <Infomelding>Du har ikke nødvendig rolle for å endre adresse</Infomelding>;
    }

    return null;
}

export function EndreKontonummerInfomeldingWrapper(props: { veilderRoller: VeilederRoller }) {
    if (!veilederHarPåkrevdRolleForEndreKontonummer(props.veilderRoller)) {
        return <Infomelding>Du har ikke nødvendig rolle for å endre brukers bankkonto</Infomelding>;
    }

    return null;
}
