import * as React from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { FortsettDialogState, FortsettDialogType } from './FortsettDialogContainer';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';

interface Props {
    formState: FortsettDialogState;
    updateDialogType: (dialogType: FortsettDialogType) => void;
    erTilknyttetOppgave: boolean;
    erDelvisBesvart: boolean;
}

function VelgDialogType(props: Props) {
    function lagRadio(label: string, type: FortsettDialogType) {
        return (
            <Radio
                label={label}
                name="dialogtype"
                onChange={() => props.updateDialogType(type)}
                checked={props.formState.dialogType === type}
            />
        );
    }

    const svar = lagRadio('Svar', Meldingstype.SVAR_SKRIFTLIG);
    const spørsmål = lagRadio('Spørsmål', Meldingstype.SPORSMAL_MODIA_UTGAAENDE);
    const delvisSvar = lagRadio('Delvis svar', Meldingstype.DELVIS_SVAR_SKRIFTLIG);
    const svarTelefon = lagRadio('Svar telefon', Meldingstype.SVAR_TELEFON);
    const svarOppmote = lagRadio('Svar oppmøte', Meldingstype.SVAR_OPPMOTE);

    if (props.erTilknyttetOppgave) {
        return (
            <VelgDialogtypeStyle>
                {svar}
                {!props.erDelvisBesvart && spørsmål}
                {delvisSvar}
            </VelgDialogtypeStyle>
        );
    }

    return (
        <VelgDialogtypeStyle>
            {svar}
            {spørsmål}
            {svarTelefon}
            {svarOppmote}
        </VelgDialogtypeStyle>
    );
}

export default VelgDialogType;
