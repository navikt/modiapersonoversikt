import * as React from 'react';
import { EnOppdateringslogg } from './OppdateringsloggContainer';
import { Ingress, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Tekstomrade from 'nav-frontend-tekstomrade';
import styled from 'styled-components/macro';
import Panel from 'nav-frontend-paneler';
import Etikett from 'nav-frontend-etiketter';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { formatterDatoTidMedMaanedsnavn } from '../../utils/date-utils';

interface Props {
    enOppdateringslogg: EnOppdateringslogg;
    visMer: boolean;
    setVisMer: (visMer: boolean) => void;
}

export enum OppdateringsloggType {
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

function OppdateringsloggEtikett({ type }: { type: OppdateringsloggType }) {
    if (type === OppdateringsloggType.Beskjed) {
        return <StyledEtikett type="info">Beskjed</StyledEtikett>;
    }
    return <StyledEtikett type="suksess">Oppdatering</StyledEtikett>;
}

function Beskrivelse({
    beskrivelse,
    visMer,
    setVisMer
}: {
    beskrivelse: string;
    visMer: boolean;
    setVisMer: (visMer: boolean) => void;
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
            >
                <Tekstomrade>{beskrivelse}</Tekstomrade>
            </Lesmerpanel>
        );
    }
    return <Tekstomrade>{beskrivelse}</Tekstomrade>;
}

export default function EnkeltOppdateringslogg(props: Props) {
    return (
        <StyledPanel border>
            <OppdateringsloggEtikett type={props.enOppdateringslogg.type} />
            {props.enOppdateringslogg.prioritet && <Etikett type="advarsel">Viktig</Etikett>}
            <Systemtittel>{props.enOppdateringslogg.tittel}</Systemtittel>
            <Ingress>{props.enOppdateringslogg.ingress}</Ingress>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.enOppdateringslogg.dato)}</Undertekst>
            <Bilde src={props.enOppdateringslogg.src} />
            <Beskrivelse
                beskrivelse={props.enOppdateringslogg.beskrivelse}
                visMer={props.visMer}
                setVisMer={props.setVisMer}
            />
        </StyledPanel>
    );
}
