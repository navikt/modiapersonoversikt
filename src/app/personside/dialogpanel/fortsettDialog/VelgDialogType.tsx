import * as React from 'react';
import { Meldingstype } from '../../../../models/meldinger/meldinger';
import { FortsettDialogType } from './FortsettDialogContainer';
import { Radio } from 'nav-frontend-skjema';
import { VelgDialogtypeStyle } from '../fellesStyling';
import { FortsettDialogState } from './FortsettDialogTypes';
import { useJustOnceEffect } from '../../../../utils/customHooks';

interface Props {
    formState: FortsettDialogState;
    updateDialogType: (dialogType: FortsettDialogType) => void;
    erTilknyttetOppgave: boolean;
    erSTOOppgave: boolean;
    erDelvisBesvart: boolean;
    erOksosTraad: boolean;
    erSamtalereferat: boolean;
}

function VelgDialogType(props: Props) {
    useJustOnceEffect(
        (done) => {
            const type = props.erSamtalereferat ? Meldingstype.SAMTALEREFERAT_TELEFON : Meldingstype.SVAR_SKRIFTLIG;
            props.updateDialogType(type);
            done();
        },
        [props.erSamtalereferat]
    );

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
    const referatTelefon = lagRadio('Referat telefon', Meldingstype.SAMTALEREFERAT_TELEFON);
    const referatOppmote = lagRadio('Referat oppmøte', Meldingstype.SAMTALEREFERAT_OPPMOTE);

    if (props.erSamtalereferat) {
        return (
            <VelgDialogtypeStyle>
                {referatTelefon}
                {referatOppmote}
            </VelgDialogtypeStyle>
        );
    } else {
        return (
            <VelgDialogtypeStyle>
                {svar}
                {spørsmål}
            </VelgDialogtypeStyle>
        );
    }
}

export default VelgDialogType;
