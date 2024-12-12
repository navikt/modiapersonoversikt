import type { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { LenkeKnapp } from '../../../../../../../../components/common-styled-components';
import innloggetSaksbehandler from '../../../../../../../../rest/resources/innloggetSaksbehandlerResource';
import oppgaveBehandlerResource from '../../../../../../../../rest/resources/oppgaveBehandlerResource';
import AutoComplete from '../AutoComplete';
import { feilmeldingReactHookForm } from '../feilmeldingReactHookForm';
import type { OppgaveSkjemaForm } from '../oppgaveInterfaces';
import useAnsattePaaEnhet from '../useAnsattePaaEnhet';
import useForeslatteEnheter from '../useForeslåtteEnheter';
import { useMatchendeEnhet } from '../useMatchendeEnhet';

const SettTilEgenOppgaveListeKnapp = styled(LenkeKnapp)`
    display: inline-block;
    float: right;
`;

interface Props {
    form: UseFormReturn<OppgaveSkjemaForm>;
    saksbehandlersEnhet: string;
}

function OppgaveSkjemaEnhetAnsatt({ form, saksbehandlersEnhet }: Props) {
    const saksbehandlerIdent = innloggetSaksbehandler.useFetch();

    const enhetliste = oppgaveBehandlerResource.useFetch();
    const { foreslatteEnheter } = useForeslatteEnheter(form);
    const valgtEnhet = useMatchendeEnhet(form);
    const { ansatte } = useAnsattePaaEnhet(valgtEnhet);

    function settTilSaksbehandlerOppgaveListe() {
        const enhet = enhetliste.data?.find((e) => e.enhetId === saksbehandlersEnhet);
        const enhetValue = enhet ? `${enhet.enhetId} ${enhet.enhetNavn}` : '';

        const ansatt = saksbehandlerIdent.data;
        const ansattValue = ansatt ? `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})` : '';

        form.setValue('valgtEnhet', enhetValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        form.setValue('valgtAnsatt', ansattValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }

    const valgtEnhetValue = form.watch('valgtEnhet');
    const valgtAnsattValue = form.watch('valgtAnsatt');

    return (
        <>
            <AutoComplete
                name="valgtEnhet"
                label={
                    <>
                        <span>Velg enhet</span>
                        {enhetliste.data && saksbehandlerIdent.data && (
                            <SettTilEgenOppgaveListeKnapp type="button" onClick={settTilSaksbehandlerOppgaveListe}>
                                Sett til min oppgaveliste
                            </SettTilEgenOppgaveListeKnapp>
                        )}
                    </>
                }
                suggestions={enhetliste.data?.map((enhet) => `${enhet.enhetId} ${enhet.enhetNavn}`) ?? []}
                topSuggestions={foreslatteEnheter.map((enhet) => `${enhet.enhetId} ${enhet.enhetNavn}`)}
                topSuggestionsLabel="Foreslåtte enheter"
                otherSuggestionsLabel="Andre enheter"
                value={valgtEnhetValue}
                setValue={(newValue) =>
                    form.setValue('valgtEnhet', newValue ?? '', {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true
                    })
                }
                feil={feilmeldingReactHookForm(form, 'valgtEnhet')}
            />
            <AutoComplete
                name="valgtAnsatt"
                label="Velg ansatt"
                suggestions={ansatte.map((ansatt) => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`)}
                setValue={(newValue) =>
                    form.setValue('valgtAnsatt', newValue ?? '', {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true
                    })
                }
                value={valgtAnsattValue}
            />
        </>
    );
}

export default OppgaveSkjemaEnhetAnsatt;
