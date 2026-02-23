import { memo } from 'react';
import {
    isDittNavEvent,
    type UnifiedVarsel as UnifiedVarselModell,
    type VarselOld as VarselModell
} from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/date-utils';
import { formaterDato } from '../../../../utils/string-utils';
import { DittNavEventVarsel } from './DittNavVarsler';
import { VarselRow } from './VarselRow';
import { getVarselTekst } from './varsel-utils';
import VarselMeldinger from './varselDetaljer/VarselMeldinger';

function Varsel({ varsel }: { varsel: VarselModell }) {
    const sortertMeldingsliste = varsel.meldingListe.sort(datoSynkende((melding) => melding.utsendingsTidspunkt));
    const datoer = sortertMeldingsliste.map((melding) => formaterDato(melding.utsendingsTidspunkt)).unique();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tittel = getVarselTekst(varsel);
    const kanaler = sortertMeldingsliste.map((melding) => melding.kanal).unique();

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <VarselRow datoer={datoer} tittel={tittel} kanaler={kanaler} varsel={varsel}>
            <VarselMeldinger sortertMeldingsliste={sortertMeldingsliste} />
        </VarselRow>
    );
}

function UnifiedVarsel({ varsel }: { varsel: UnifiedVarselModell }) {
    if (isDittNavEvent(varsel)) {
        return <DittNavEventVarsel varsel={varsel} />;
    }
    return <Varsel varsel={varsel} />;
}

export default memo(UnifiedVarsel);
