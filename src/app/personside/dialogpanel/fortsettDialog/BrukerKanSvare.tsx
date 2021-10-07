import * as React from 'react';
import Oppgaveliste from '../sendMelding/Oppgaveliste';
import DialogpanelVelgSak from '../sendMelding/DialogpanelVelgSak';
import styled from 'styled-components/macro';
import { FortsettDialogValidator } from './validatorer';
import { FortsettDialogState } from './FortsettDialogTypes';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';

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
    const visFeilmelding = !FortsettDialogValidator.sak(props.formState) && props.formState.visFeilmeldinger;
    return (
        <Style>
            <AlertStripeInfo>Gir varsel, bruker kan svare</AlertStripeInfo>
            <Oppgaveliste
                oppgaveliste={props.formState.oppgaveListe}
                setOppgaveliste={oppgaveliste => props.updateFormState({ oppgaveListe: oppgaveliste })}
            />
            {props.visVelgSak && (
                <>
                    <DialogpanelVelgSak
                        setValgtSak={sak => props.updateFormState({ sak: sak })}
                        valgtSak={props.formState.sak}
                        visFeilmelding={visFeilmelding}
                    />
                    {visFeilmelding ? <SkjemaelementFeilmelding>Du må velge sak </SkjemaelementFeilmelding> : null}
                </>
            )}
        </Style>
    );
}

export default BrukerKanSvare;
