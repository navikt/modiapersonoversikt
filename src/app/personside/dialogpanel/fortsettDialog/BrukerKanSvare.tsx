import * as React from 'react';
import Oppgaveliste from '../sendMelding/Oppgaveliste';
import DialogpanelVelgSak from '../sendMelding/DialogpanelVelgSak';
import styled from 'styled-components';
import { FortsettDialogValidator } from './validatorer';
import { FortsettDialogState } from './FortsettDialogTypes';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { JournalforingsSakIdentifikator } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

interface Props {
    formState: FortsettDialogState;
    updateFormState: (change: Partial<FortsettDialogState>) => void;
    visVelgSak: boolean;
    eksisterendeSaker: Array<JournalforingsSakIdentifikator>;
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
            <Oppgaveliste
                oppgaveliste={props.formState.oppgaveListe}
                setOppgaveliste={(oppgaveliste) => props.updateFormState({ oppgaveListe: oppgaveliste })}
            />
            {props.visVelgSak && (
                <>
                    <DialogpanelVelgSak
                        setValgtSak={(sak) => props.updateFormState({ sak: sak })}
                        valgtSak={props.formState.sak}
                        visFeilmelding={visFeilmelding}
                        eksisterendeSaker={props.eksisterendeSaker}
                    />
                    {visFeilmelding ? <SkjemaelementFeilmelding>Du må velge sak </SkjemaelementFeilmelding> : null}
                </>
            )}
        </Style>
    );
}

export default BrukerKanSvare;
