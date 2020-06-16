import * as React from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { FortsettDialogType } from './FortsettDialogContainer';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';
import { FortsettDialogState } from './FortsettDialogTypes';
import { useAppState } from '../../../../utils/customHooks';

interface Props {
    formState: FortsettDialogState;
    updateDialogType: (dialogType: FortsettDialogType) => void;
    erTilknyttetOppgave: boolean;
    erDelvisBesvart: boolean;
    erOksosTraad: boolean;
}

function VelgDialogType(props: Props) {
    const jobberMedSTO = useAppState(state => state.session.jobberMedSTO);
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
    const infomelding = lagRadio('Infomelding', Meldingstype.INFOMELDING_MODIA_UTGAAENDE);

    if (props.erDelvisBesvart) {
        return (
            <VelgDialogtypeStyle>
                {svar}
                {!props.erOksosTraad && delvisSvar}
            </VelgDialogtypeStyle>
        );
    }

    if (props.erTilknyttetOppgave) {
        return (
            <VelgDialogtypeStyle>
                {svar}
                {spørsmål}
                {!props.erOksosTraad && delvisSvar}
                {!jobberMedSTO && svarTelefon}
                {!jobberMedSTO && svarOppmote}
                {infomelding}
            </VelgDialogtypeStyle>
        );
    }

    return (
        <VelgDialogtypeStyle>
            {svar}
            {spørsmål}
            {svarTelefon}
            {svarOppmote}
            {infomelding}
        </VelgDialogtypeStyle>
    );
}

export default VelgDialogType;
