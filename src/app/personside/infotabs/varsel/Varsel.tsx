import * as React from 'react';
import {
    Varsel as VarselModell,
    UnifiedVarsel as UnifiedVarselModell,
    isDittNavEvent
} from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/date-utils';
import VarselMeldinger from './varselDetaljer/VarselMeldinger';
import { formaterDato } from '../../../../utils/string-utils';
import { DittNavEventVarsel, DittNavEventVarselV2 } from './DittNavVarsler';
import { VarselRow } from './VarselRow';
import { getVarselTekst } from './varsel-utils';
import IfFeatureToggleOn from '../../../../components/featureToggle/IfFeatureToggleOn';
import IfFeatureToggleOff from '../../../../components/featureToggle/IfFeatureToggleOff';
import { FeatureToggles } from '../../../../components/featureToggle/toggleIDs';

function Varsel({ varsel }: { varsel: VarselModell }) {
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende((melding) => melding.utsendingsTidspunkt));
    const datoer = sortertMeldingsliste.map((melding) => formaterDato(melding.utsendingsTidspunkt)).unique();
    const tittel = getVarselTekst(varsel);
    const kanaler = sortertMeldingsliste.map((melding) => melding.kanal).unique();

    return (
        <VarselRow datoer={datoer} tittel={tittel} kanaler={kanaler} varsel={varsel}>
            <VarselMeldinger sortertMeldingsliste={sortertMeldingsliste} />
        </VarselRow>
    );
}

function UnifiedVarsel({ varsel }: { varsel: UnifiedVarselModell }) {
    if (isDittNavEvent(varsel)) {
        return (
            <>
                <IfFeatureToggleOn toggleID={FeatureToggles.visRevarslingDetaljer}>
                    <DittNavEventVarselV2 varsel={varsel} />
                </IfFeatureToggleOn>
                <IfFeatureToggleOff toggleID={FeatureToggles.visRevarslingDetaljer}>
                    <DittNavEventVarsel varsel={varsel} />
                </IfFeatureToggleOff>
            </>
        );
    }
    return <Varsel varsel={varsel} />;
}

export default React.memo(UnifiedVarsel);
