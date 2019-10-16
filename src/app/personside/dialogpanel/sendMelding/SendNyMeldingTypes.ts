import { SendReferatRequest } from '../../../../models/meldinger/meldinger';

export enum SendNyMeldingStatus {
    UNDER_ARBEID,
    POSTING,
    ERROR,
    REFERAT_SENDT,
    SPORSMAL_SENDT
}

interface SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus;
}

interface UnderArbeid extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.UNDER_ARBEID | SendNyMeldingStatus.POSTING | SendNyMeldingStatus.ERROR;
}

interface ReferatSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.REFERAT_SENDT;
    request: SendReferatRequest;
}

interface SporsmalSendtSuccess extends SendNyMeldingStatusInterface {
    type: SendNyMeldingStatus.SPORSMAL_SENDT;
    fritekst: string;
}

export type SendNyMeldingPanelState = UnderArbeid | ReferatSendtSuccess | SporsmalSendtSuccess;
