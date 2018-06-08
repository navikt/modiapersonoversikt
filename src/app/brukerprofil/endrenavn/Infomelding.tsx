import * as React from 'react';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { brukersNavnKanEndres, veilederHarPåkrevdRolle } from './endrenavn-utils';
import { VeilederRoller } from '../../../models/veilederRoller';
import { Person } from '../../../models/person/person';

const Luft = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

function Infomelding(props: {children: string}) {
    return (
        <Luft>
            <AlertStripe
                type={'info'}
            >
                {props.children}
            </AlertStripe>
        </Luft>
    );
}

export default function InfomeldingWrapper(props: {veilderRoller?: VeilederRoller, person: Person}) {

    if (!veilederHarPåkrevdRolle(props.veilderRoller)) {
        return (
            <Infomelding>Du har ikke nødvendig rollle for å endre navn</Infomelding>
        );
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