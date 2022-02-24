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

function lagRadio(label: string, type: FortsettDialogType, props: Props): React.ReactNode {
    return (
        <Radio
            label={label}
            name="dialogtype"
            onChange={() => props.updateDialogType(type)}
            checked={props.formState.dialogType === type}
        />
    );
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

    if (props.erSamtalereferat) {
        return (
            <VelgDialogtypeStyle>
                {lagRadio('Referat telefon', Meldingstype.SAMTALEREFERAT_TELEFON, props)}
                {lagRadio('Referat oppmøte', Meldingstype.SAMTALEREFERAT_OPPMOTE, props)}
            </VelgDialogtypeStyle>
        );
    } else {
        return (
            <VelgDialogtypeStyle>
                {lagRadio('Svar', Meldingstype.SVAR_SKRIFTLIG, props)}
                {lagRadio('Spørsmål', Meldingstype.SPORSMAL_MODIA_UTGAAENDE, props)}
            </VelgDialogtypeStyle>
        );
    }
}

export default VelgDialogType;
