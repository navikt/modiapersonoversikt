import * as React from 'react';
import { EnOppdateringslogg } from './OppdateringsloggContainer';
import { Ingress, Undertekst, Undertittel } from 'nav-frontend-typografi';
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
    text-align: center;
    flex: 1;
`;

const StyledDiv = styled.div`
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 3px 3px #ccc;
`;

const StyledEtikett = styled(Etikett)`
    display: flex;
    align-self: flex-start;
    margin-left: 1rem;
`;

const StyledLesmerpanel = styled(Lesmerpanel)`
    margin: -0.5rem;
    padding: 0rem;
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
            <StyledLesmerpanel
                defaultApen={visMer}
                onOpen={() => {
                    setVisMer(true);
                }}
                onClose={() => {
                    setVisMer(false);
                }}
                apneTekst={''}
                lukkTekst={''}
            >
                <Tekstomrade>{beskrivelse}</Tekstomrade>
            </StyledLesmerpanel>
        );
    }
    return <Tekstomrade>{beskrivelse}</Tekstomrade>;
}

export default function EnkeltOppdateringslogg(props: Props) {
    return (
        <>
            <Bilde src={props.enOppdateringslogg.src} />
            {props.enOppdateringslogg.prioritet && <StyledEtikett type="advarsel">Viktig</StyledEtikett>}
            <StyledPanel>
                <Undertittel>{props.enOppdateringslogg.tittel}</Undertittel>
                <Ingress>{props.enOppdateringslogg.ingress}</Ingress>
                <Undertekst>{formatterDatoTidMedMaanedsnavn(props.enOppdateringslogg.dato)}</Undertekst>
                <Beskrivelse
                    beskrivelse={props.enOppdateringslogg.beskrivelse}
                    visMer={props.visMer}
                    setVisMer={props.setVisMer}
                />
            </StyledPanel>
        </>
    );
}
