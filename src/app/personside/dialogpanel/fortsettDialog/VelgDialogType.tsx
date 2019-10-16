import * as React from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { FortsettDialogType } from './FortsettDialogContainer';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';
import { FortsettDialogState } from './FortsettDialogTypes';

interface Props {
    formState: FortsettDialogState;
    updateDialogType: (dialogType: FortsettDialogType) => void;
    erTilknyttetOppgave: boolean;
}

function VelgDialogType(props: Props) {
    const delvisSvarRadio = (
        <Radio
            label="Delvis svar"
            onChange={() => props.updateDialogType(Meldingstype.DELVIS_SVAR_SKRIFTLIG)}
            checked={props.formState.dialogType === Meldingstype.DELVIS_SVAR_SKRIFTLIG}
            name="dialogtype"
        />
    );

    const svarOppmoteTelefonRadios = (
        <>
            <Radio
                label="Svar telefon"
                onChange={() => props.updateDialogType(Meldingstype.SVAR_TELEFON)}
                checked={props.formState.dialogType === Meldingstype.SVAR_TELEFON}
                name="dialogtype"
            />
            <Radio
                label="Svar oppmøte"
                onChange={() => props.updateDialogType(Meldingstype.SVAR_OPPMOTE)}
                checked={props.formState.dialogType === Meldingstype.SVAR_OPPMOTE}
                name="dialogtype"
            />
        </>
    );

    return (
        <VelgDialogtypeStyle>
            <Radio
                label="Svar"
                onChange={() => props.updateDialogType(Meldingstype.SVAR_SKRIFTLIG)}
                checked={props.formState.dialogType === Meldingstype.SVAR_SKRIFTLIG}
                name="dialogtype"
            />
            <Radio
                label="Spørsmål"
                onChange={() => props.updateDialogType(Meldingstype.SPORSMAL_MODIA_UTGAAENDE)}
                checked={props.formState.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE}
                name="dialogtype"
            />
            {props.erTilknyttetOppgave ? delvisSvarRadio : svarOppmoteTelefonRadios}
        </VelgDialogtypeStyle>
    );
}

export default VelgDialogType;
