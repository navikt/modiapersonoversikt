import React from 'react';
import { FormState, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import styled from 'styled-components';
import { LenkeKnapp } from '../../../../../../../../components/common-styled-components';
import oppgaveBehandlerResource from '../../../../../../../../rest/resources/oppgaveBehandlerResource';
import innloggetSaksbehandler from '../../../../../../../../rest/resources/innloggetSaksbehandlerResource';
import AutoComplete from '../AutoComplete';
import { OppgaveSkjemaForm } from '../oppgaveInterfaces';
import useAnsattePaaEnhet from '../useAnsattePaaEnhet';
import useForeslatteEnheter from '../useForeslåtteEnheter';
import { useMatchendeEnhet } from '../useMatchendeEnhet';
import { feilmeldingReactHookForm } from '../validering';

const SettTilEgenOppgaveListeKnapp = styled(LenkeKnapp)`
    display: inline-block;
    float: right;
`;

interface Props {
    formState: FormState<OppgaveSkjemaForm>;
    watch: UseFormWatch<OppgaveSkjemaForm>;
    setValue: UseFormSetValue<OppgaveSkjemaForm>;
    saksbehandlersEnhet: string;
}

const OppgaveSkjemaEnhetAnsatt: React.FC<Props> = ({ formState, watch, setValue, saksbehandlersEnhet }) => {
    const saksbehandlerIdent = innloggetSaksbehandler.useFetch();

    const enhetliste = oppgaveBehandlerResource.useFetch();
    const { foreslatteEnheter } = useForeslatteEnheter(watch);
    const valgtEnhet = useMatchendeEnhet(watch);
    const { ansatte } = useAnsattePaaEnhet(valgtEnhet);

    const settTilSaksbehandlerOppgaveListe = () => {
        const enhet = enhetliste.data?.find((e) => e.enhetId === saksbehandlersEnhet);
        const enhetValue = enhet ? `${enhet.enhetId} ${enhet.enhetNavn}` : '';

        const ansatt = saksbehandlerIdent.data;
        const ansattValue = ansatt ? `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})` : '';

        setValue('valgtEnhet', enhetValue);
        setValue('valgtAnsatt', ansattValue);
    };

    const valgtEnhetValue = watch('valgtEnhet');
    const valgtAnsattValue = watch('valgtAnsatt');

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
                    setValue('valgtEnhet', newValue ?? '', {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true
                    })
                }
                feil={feilmeldingReactHookForm('valgtEnhet', formState)}
            />
            <AutoComplete
                name="valgtAnsatt"
                label="Velg ansatt"
                suggestions={ansatte.map((ansatt) => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`)}
                setValue={(newValue) =>
                    setValue('valgtAnsatt', newValue ?? '', {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true
                    })
                }
                value={valgtAnsattValue}
            />
        </>
    );
};

export default OppgaveSkjemaEnhetAnsatt;
