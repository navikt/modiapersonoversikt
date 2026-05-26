import { CopyButton, Detail } from '@navikt/ds-react';
import { erGyldigishFnr } from 'src/utils/fnr-utils';

export const KopierFnrKnapp = ({ fnr }: { fnr?: string }) => {
    const fnrOppdelt = fnr ? `${fnr.slice(0, 6)} ${fnr.slice(6)}` : null;

    return fnr && erGyldigishFnr(fnr) ? (
        <CopyButton
            aria-label={`Kopier f.nr: ${fnrOppdelt}`}
            size="xsmall"
            className="p-0"
            copyText={fnr}
            activeText="Kopiert f.nr"
            text={`F.nr: ${fnrOppdelt}`}
        />
    ) : (
        <Detail className="p-0">Ukjent</Detail>
    );
};
