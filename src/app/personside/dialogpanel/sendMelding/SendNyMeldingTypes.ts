import { SendReferatRequest, Traad } from '../../../../models/meldinger/meldinger';

export enum SendNyMeldingStatus {
    UNDER_ARBEID,
    POSTING,
    ERROR,
    REFERAT_SENDT,
    SPORSMAL_SENDT,
    SVAR_SENDT,
    INFORMELDING_SENDT
}

interface SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus;
}

interface UnderArbeid extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.UNDER_ARBEID | SendNyMeldingStatus.POSTING;
}

interface ReferatSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.REFERAT_SENDT;
    request: SendReferatRequest;
    kvitteringNyMelding: KvitteringNyMelding;
}

interface SporsmalSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.SPORSMAL_SENDT;
    kvitteringNyMelding: KvitteringNyMelding;
}

interface InfomeldingSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.INFORMELDING_SENDT;
    kvitteringNyMelding: KvitteringNyMelding;
}

interface SporsmalSendtError extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.ERROR;
    fritekst: string;
}

export type SendNyMeldingPanelState =
    | UnderArbeid
    | ReferatSendtSuccess
    | SporsmalSendtSuccess
    | SporsmalSendtError
    | InfomeldingSendtSuccess;

export type KvitteringNyMelding = {
    fritekst: string;
    traad: Traad;
};
