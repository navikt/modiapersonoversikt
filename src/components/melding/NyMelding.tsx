import { Alert, Bleed, Box, Button, ErrorMessage, HGrid, HStack, VStack } from '@navikt/ds-react';
import { type ValidationError, useForm, useStore } from '@tanstack/react-form';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useRef, useState } from 'react';
import DraftStatus from 'src/app/personside/dialogpanel/DraftStatus';
import useDraft, { type Draft, type DraftContext } from 'src/app/personside/dialogpanel/use-draft';
import { Oppgaveliste } from 'src/components/melding/OppgavelisteOptions';
import { ValgForMeldingstype } from 'src/components/melding/ValgForMeldingstype';
import { MeldingsType, VelgMeldingsType, meldingsTyperTekst } from 'src/components/melding/VelgMeldingsType';
import VelgOppgaveliste from 'src/components/melding/VelgOppgaveliste';
import VelgTema from 'src/components/melding/VelgTema';
import nyMeldingSchema, { maksLengdeMelding } from 'src/components/melding/nyMeldingSchema';
import AutoCompleteTekstTips from 'src/components/melding/standardtekster/AutoCompleteTekstTips';
import StandardTekstModal from 'src/components/melding/standardtekster/StandardTeksterModal';
import { settInnStandardTekst } from 'src/components/melding/standardtekster/settInnStandardTekst';
import VelgSak from 'src/components/sakVelger/VelgSak';
import {
    type JournalforingSak,
    type SendMeldingRequestV2,
    SendMeldingRequestV2TraadType
} from 'src/generated/modiapersonoversikt-api';
import { useSendMelding } from 'src/lib/clients/modiapersonoversikt-api';
import { useSuspendingBrukernavn } from 'src/lib/hooks/useSuspendingBrukernavn';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Temagruppe } from 'src/models/temagrupper';
import type { z } from 'zod';
import AutocompleteTextarea from './AutoCompleteTextarea';

function NyMelding() {
    const fnr = usePersonAtomValue();
    const enhetsId = useAtomValue(aktivEnhetAtom);
    const brukerNavn = useSuspendingBrukernavn();

    const { error, mutate, isPending, isSuccess } = useSendMelding();

    // Brukes for å sette initialverdien til meldingen basert på draften
    const [defaultMessage, setDefaultMessage] = useState('');
    const draftLoader = useCallback((draft: Draft) => setDefaultMessage(draft.content), []);
    const draftContext: DraftContext = useMemo(() => ({ fnr }), [fnr]);

    const { update: updateDraft, remove: removeDraft, status: draftStatus } = useDraft(draftContext, draftLoader);

    const defaultFormOptions: DefaultFormOptions = {
        meldingsType: MeldingsType.Referat,
        melding: defaultMessage,
        tema: undefined,
        oppgaveliste: Oppgaveliste.MinListe,
        sak: undefined,
        fnr: fnr ?? '',
        enhetsId: enhetsId ?? ''
    };
    const form = useForm({
        defaultValues: defaultFormOptions,
        validators: {
            onSubmit: nyMeldingSchema
        },
        onSubmit: ({ value }) => {
            const body = generateRequestBody(value as NyMeldingSchema);
            mutate(
                { body: body },
                {
                    onSuccess: () => {
                        removeDraft();
                        form.reset(
                            {
                                ...defaultFormOptions,
                                melding: '',
                                meldingsType
                            },
                            { keepDefaultValues: true }
                        );
                    }
                }
            );
        }
    });

    const meldingsType = useStore(form.store, (state) => state.values.meldingsType);
    const meldingsTypeTekst = meldingsTyperTekst[meldingsType];
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
            }}
        >
            <VStack gap="4">
                <form.Field name="meldingsType">
                    {(field) => (
                        <VelgMeldingsType
                            meldingsType={field.state.value}
                            setMeldingsType={(meldingsType) => field.handleChange(meldingsType)}
                        />
                    )}
                </form.Field>
                <ValgForMeldingstype
                    meldingsType={meldingsType}
                    velgTema={
                        <form.Field name="tema">
                            {(field) => (
                                <VelgTema
                                    valgtTema={field.state.value}
                                    setValgtTema={(tema) => field.handleChange(tema)}
                                    error={<ValidationErrorMessage errors={field.state.meta.errors} />}
                                />
                            )}
                        </form.Field>
                    }
                    velgOppgaveliste={
                        <form.Field name="oppgaveliste">
                            {(field) => (
                                <VelgOppgaveliste
                                    valgtOppgaveliste={field.state.value}
                                    setValgtOppgaveliste={(oppgaveliste) => field.handleChange(oppgaveliste)}
                                />
                            )}
                        </form.Field>
                    }
                    velgSak={
                        <form.Field name="sak">
                            {(field) => (
                                <VelgSak
                                    valgtSak={field.state.value}
                                    setSak={field.handleChange}
                                    error={<ValidationErrorMessage errors={field.state.meta.errors} />}
                                />
                            )}
                        </form.Field>
                    }
                />
                <VStack gap="1">
                    <form.Field
                        name="melding"
                        listeners={{
                            onChange: ({ value }) => {
                                if (value.length === 0) {
                                    removeDraft();
                                }
                                if (value.length > 0) {
                                    updateDraft(value);
                                }
                            }
                        }}
                    >
                        {(field) => (
                            <div>
                                <AutocompleteTextarea
                                    ref={textAreaRef}
                                    label={meldingsTypeTekst.tittel}
                                    hideLabel
                                    size="small"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    error={buildErrorMessage(field.state.meta.errors)}
                                    maxLength={maksLengdeMelding}
                                    resize="vertical"
                                    minRows={10}
                                    maxRows={15}
                                />
                            </div>
                        )}
                    </form.Field>
                    <HGrid gap="2" columns={{ xs: 1, md: '2fr 3fr' }}>
                        <Box.New flexGrow="1">
                            {draftStatus &&
                                form.getFieldValue('melding').length > 0 &&
                                form.getFieldMeta('melding')?.isDirty && <DraftStatus state={draftStatus} />}
                        </Box.New>
                        <Bleed marginBlock={{ xs: '0 0', md: 'space-20 space-0' }} asChild>
                            <HStack gap="1" justify="end">
                                <HStack justify="center">
                                    <AutoCompleteTekstTips />
                                    <StandardTekstModal
                                        textAreaRef={textAreaRef}
                                        submitTekst={(standardTekst) =>
                                            settInnStandardTekst(standardTekst, textAreaRef, (e) =>
                                                form.setFieldValue('melding', e.target.value)
                                            )
                                        }
                                    />
                                </HStack>
                                <HStack justify="center" align="start">
                                    <Button type="submit" size="small" loading={isPending}>
                                        Send til {brukerNavn}
                                    </Button>
                                </HStack>
                            </HStack>
                        </Bleed>
                    </HGrid>
                </VStack>
                {isSuccess && <Alert variant="success">Meldingen ble sendt</Alert>}
                {error && <Alert variant="error">Det skjedde en feil. Meldingen ble ikke sendt</Alert>}
            </VStack>
        </form>
    );
}

function ValidationErrorMessage({ errors }: { errors: ValidationError[] }) {
    return errors.isNotEmpty() ? <ErrorMessage>{buildErrorMessage(errors)}</ErrorMessage> : null;
}

function buildErrorMessage(errors: ValidationError[]) {
    const flatErrors = errors.flatMap((e) => (Array.isArray(e) ? e : [e]));
    return flatErrors.length > 0
        ? flatErrors
              .filter((e) => e.message != null)
              .map((e) => e.message)
              .join(', ')
        : null;
}

// Funksjonen forventer at parameteren allerede er validert
function generateRequestBody(value: NyMeldingSchema) {
    const common: Pick<SendMeldingRequestV2, 'enhet' | 'fritekst' | 'fnr'> = {
        enhet: value.enhetsId,
        fritekst: value.melding,
        fnr: value.fnr
    };
    let request: SendMeldingRequestV2;

    switch (value.meldingsType) {
        case MeldingsType.Referat:
            request = {
                ...common,
                traadType: SendMeldingRequestV2TraadType.SAMTALEREFERAT,
                temagruppe: value.tema
            };
            break;
        case MeldingsType.Samtale:
            request = {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                avsluttet: false,
                erOppgaveTilknyttetAnsatt: value.oppgaveliste === Oppgaveliste.MinListe,
                sak: value.sak
            };
            break;
        case MeldingsType.Infomelding:
            request = {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                avsluttet: true,
                sak: value.sak,
                erOppgaveTilknyttetAnsatt: value.oppgaveliste === Oppgaveliste.MinListe
            };
            break;
    }
    return request;
}

type NyMeldingSchema = z.infer<typeof nyMeldingSchema>;

interface DefaultFormOptions {
    meldingsType: MeldingsType;
    melding: string;
    tema?: Temagruppe;
    oppgaveliste?: Oppgaveliste;
    sak?: JournalforingSak;
    fnr: string;
    enhetsId: string;
}

export default NyMelding;
