import type { SendReferatRequest, Traad } from '../../../../models/meldinger/meldinger';

export enum SendNyMeldingStatus {
    UNDER_ARBEID = 0,
    POSTING = 1,
    ERROR = 2,
    REFERAT_SENDT = 3,
    SPORSMAL_SENDT = 4,
    SVAR_SENDT = 5,
    INFORMELDING_SENDT = 6,
    SAMTALE_SENDT = 7
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

interface SamtaleSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.SAMTALE_SENDT;
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
    | SamtaleSendtSuccess
    | SporsmalSendtSuccess
    | SporsmalSendtError
    | InfomeldingSendtSuccess;

export type KvitteringNyMelding = {
    fritekst: string;
    traad: Traad;
};
