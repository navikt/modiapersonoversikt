import { InlineMessage } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { aktivEnhetObjektAtom } from 'src/lib/state/context';

export const IkkeOppgavebehandlendeEnhetAlert = () => {
    const aktivEnhet = useAtomValue(aktivEnhetObjektAtom);
    const erOppgaveBehandler = !!aktivEnhet?.oppgavebehandler;

    if (erOppgaveBehandler) return null;
    return (
        <InlineMessage size="small" status="warning" className="mb-4">
            {`${aktivEnhet?.enhetId} ${aktivEnhet?.navn} har ikke en oppgavebenk. Skal du sende melding til bruker må du bytte enhet.`}
        </InlineMessage>
    );
};
