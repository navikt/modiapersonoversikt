import * as React from 'react';
import { Notifikasjon } from './NotifikasjonsContainer';
import { Ingress, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Tekstomrade from 'nav-frontend-tekstomrade';
import styled from 'styled-components';
import Panel from 'nav-frontend-paneler';
import Etikett from 'nav-frontend-etiketter';
import Lesmerpanel from 'nav-frontend-lesmerpanel';

interface Props {
    notifikasjon: Notifikasjon;
}

export enum NotifikasjonsType {
    Beskjed = 'beskjed',
    Oppdatering = 'oppdatering'
}

export enum NotifikasjonsPrioritet {
    Lav,
    Middels,
    Hoy
}

const StyledPanel = styled(Panel)`
    margin: 1rem;
`;

const StyledEtikettOppdatering = styled(Etikett)`
    margin: 0rem;
    float: right;
`;

const StyledEtikettBeskjed = styled(Etikett)`
    margin: 0rem;
    float: right;
`;

const StyledEtikettViktig = styled(Etikett)`
    margin: 0rem;
    background-color: red;
    color: white;
`;

function NotifikasjonsEtikett({ type }: { type: NotifikasjonsType }) {
    if (type === NotifikasjonsType.Beskjed) {
        return <StyledEtikettBeskjed type="info">Beskjed</StyledEtikettBeskjed>;
    }
    return <StyledEtikettOppdatering type="suksess">Oppdatering</StyledEtikettOppdatering>;
}

function NotifikasjonPrioritet({ prioritet }: { prioritet: NotifikasjonsPrioritet }) {
    if (prioritet === NotifikasjonsPrioritet.Hoy) {
        return <StyledEtikettViktig type="advarsel">Viktig</StyledEtikettViktig>;
    }
    return null;
}

function Beskrivelse({ beskrivelse }: { beskrivelse: string }) {
    if (beskrivelse.length > 150) {
        return (
            <Lesmerpanel>
                <Tekstomrade>{beskrivelse}</Tekstomrade>
            </Lesmerpanel>
        );
    }
    return <Tekstomrade>{beskrivelse}</Tekstomrade>;
}

export default function EnkeltNotifikasjon(props: Props) {
    return (
        <StyledPanel border>
            <NotifikasjonsEtikett type={props.notifikasjon.type} />
            <NotifikasjonPrioritet prioritet={props.notifikasjon.prioritet} />
            <Systemtittel>{props.notifikasjon.tittel}</Systemtittel>
            <Ingress>{props.notifikasjon.ingress}</Ingress>
            <Undertekst>{props.notifikasjon.dato}</Undertekst>
            <Beskrivelse beskrivelse={props.notifikasjon.beskrivelse} />
        </StyledPanel>
    );
}
