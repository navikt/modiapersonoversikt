import * as React from 'react';
import { Notifikasjon } from './NotifikasjonsContainer';
import { Ingress, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Tekstomrade from 'nav-frontend-tekstomrade';
import styled from 'styled-components';
import Panel from 'nav-frontend-paneler';
import Etikett from 'nav-frontend-etiketter';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { formatterDatoTidMedMaanedsnavn } from '../../utils/date-utils';

interface Props {
    notifikasjon: Notifikasjon;
    visMer: boolean;
    setVisMer: (visMer: boolean) => void;
}

export enum NotifikasjonsType {
    Beskjed = 'beskjed',
    Oppdatering = 'oppdatering'
}

const StyledPanel = styled(Panel)`
    margin: 1rem;
`;

const StyledEtikett = styled(Etikett)`
    margin: 0rem;
    float: right;
`;

const StyledDiv = styled.div`
    text-align: center;
    margin-top: 1rem;
`;

function Bilde({ src }: { src?: string }) {
    if (!src) {
        return null;
    }
    return (
        <StyledDiv>
            <img src={src} alt={''} width="100%" height="100%" />
        </StyledDiv>
    );
}

function NotifikasjonsEtikett({ type }: { type: NotifikasjonsType }) {
    if (type === NotifikasjonsType.Beskjed) {
        return <StyledEtikett type="info">Beskjed</StyledEtikett>;
    }
    return <StyledEtikett type="suksess">Oppdatering</StyledEtikett>;
}

function Beskrivelse({
    beskrivelse,
    visMer,
    setVisMer,
    id
}: {
    beskrivelse: string;
    visMer: boolean;
    setVisMer: (visMer: boolean) => void;
    id: string;
}) {
    if (beskrivelse.length > 150) {
        return (
            <Lesmerpanel
                defaultApen={visMer}
                onOpen={() => {
                    setVisMer(true);
                }}
                onClose={() => {
                    setVisMer(false);
                }}
                key={id}
            >
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
            {props.notifikasjon.prioritet && <Etikett type="advarsel">Viktig</Etikett>}
            <Systemtittel>{props.notifikasjon.tittel}</Systemtittel>
            <Ingress>{props.notifikasjon.ingress}</Ingress>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.notifikasjon.dato)}</Undertekst>
            <Bilde src={props.notifikasjon.src} />
            <Beskrivelse
                beskrivelse={props.notifikasjon.beskrivelse}
                visMer={props.visMer}
                setVisMer={props.setVisMer}
                id={props.notifikasjon.id}
            />
        </StyledPanel>
    );
}
