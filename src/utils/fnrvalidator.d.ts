declare module '@navikt/fnrvalidator' {
    export enum ErrorReason {
        LENGTH = 'fnr or dnr must consist of 11 digits',
        CHECKSUM = "checksums don't match",
        DATE = 'invalid date'
    }
    type OkResult = { status: 'valid'; type: 'dnr' | 'fnr' };
    type ErrorResult = { status: 'invalid'; reasons: ErrorReason[] };
    type ValidationResult = OkResult | ErrorResult;

    export function fnr(fnr: string): ValidationResult;
}
