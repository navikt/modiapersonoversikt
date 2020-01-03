import * as React from 'react';
import Oppgaveliste from '../sendMelding/Oppgaveliste';
import DialogpanelVelgSak from '../sendMelding/DialogpanelVelgSak';
import styled from 'styled-components';
import { FortsettDialogValidator } from './validatorer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { FortsettDialogState } from './FortsettDialogTypes';

interface Props {
    formState: FortsettDialogState;
    updateFormState: (change: Partial<FortsettDialogState>) => void;
    visVelgSak: boolean;
}

const Style = styled.div`
    > *:not(:first-child) {
        margin-top: 1rem;
    }
`;

function BrukerKanSvare(props: Props) {
    return (
        <Style>
            <AlertStripeInfo>Bruker kan svare, og får varsel</AlertStripeInfo>
            <Oppgaveliste
                oppgaveliste={props.formState.oppgaveListe}
                setOppgaveliste={oppgaveliste => props.updateFormState({ oppgaveListe: oppgaveliste })}
            />
            {props.visVelgSak && (
                <DialogpanelVelgSak
                    setValgtSak={sak => props.updateFormState({ sak: sak })}
                    valgtSak={props.formState.sak}
                    visFeilmelding={!FortsettDialogValidator.sak(props.formState) && props.formState.visFeilmeldinger}
                />
            )}
        </Style>
    );
}

export default BrukerKanSvare;
