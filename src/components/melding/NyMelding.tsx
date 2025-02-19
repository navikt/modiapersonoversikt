import { Alert, Button, ErrorMessage, HStack, Heading, Textarea, VStack } from '@navikt/ds-react';
import { type ValidationError, useForm, useStore } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { type ReactElement, useCallback, useMemo, useState } from 'react';
import DraftStatus from 'src/app/personside/dialogpanel/DraftStatus';
import useDraft, { type Draft, type DraftContext } from 'src/app/personside/dialogpanel/use-draft';
import AvsluttDialogEtterSending from 'src/components/melding/AvsluttDialogEtterSending';
import { Oppgaveliste, OppgavelisteRadioKnapper } from 'src/components/melding/OppgavelisteRadioKnapper';
import { ValgForMeldingstype } from 'src/components/melding/ValgForMeldingstype';
import { MeldingsType, VelgMeldingsType, meldingsTyperTekst } from 'src/components/melding/VelgMeldingsType';
import VelgOppgaveliste from 'src/components/melding/VelgOppgaveliste';
import VelgSak from 'src/components/melding/VelgSak';
import VelgTema from 'src/components/melding/VelgTema';
import nyMeldingSchema, { maksLengdeMelding } from 'src/components/melding/nyMeldingSchema';
import {
    type JournalforingSak,
    type SendMeldingRequestV2,
    SendMeldingRequestV2TraadType
} from 'src/generated/modiapersonoversikt-api';
import { useSendMelding } from 'src/lib/clients/modiapersonoversikt-api';
import { useEnhetsnavn } from 'src/lib/hooks/useEnhetsnavn';
import { useSuspendingBrukernavn } from 'src/lib/hooks/useSuspendingBrukernavn';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Temagruppe } from 'src/models/temagrupper';
import type { z } from 'zod';
import Card from '../Card';

interface NyMeldingProps {
    lukkeKnapp?: ReactElement<typeof Button>;
}

function NyMelding({ lukkeKnapp }: NyMeldingProps) {
    const fnr = usePersonAtomValue();
    const enhetsId = useAtomValue(aktivEnhetAtom);
    const enhetsNavn = useEnhetsnavn(enhetsId);
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

    return (
        <Card padding="2" maxWidth="30vw" minWidth="24em">
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await form.handleSubmit();
                }}
            >
                <VStack gap="4">
                    <HStack justify="space-between">
                        <Heading level="1" size="medium">
                            Send ny dialog
                        </Heading>
                        {lukkeKnapp}
                    </HStack>
                    <form.Field name="meldingsType">
                        {(field) => (
                            <VelgMeldingsType
                                meldingsType={field.state.value}
                                setMeldingsType={(meldingsType) => field.handleChange(meldingsType)}
                            />
                        )}
                    </form.Field>
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
                                <Textarea
                                    label={meldingsTypeTekst.tittel}
                                    description={meldingsTypeTekst.beskrivelse}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    error={buildErrorMessage(field.state.meta.errors)}
                                    maxLength={maksLengdeMelding}
                                    resize="vertical"
                                    minRows={5}
                                    maxRows={15}
                                />
                                {draftStatus && field.state.value.length > 0 && field.state.meta.isDirty && (
                                    <DraftStatus state={draftStatus} />
                                )}
                            </div>
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
                                        oppgavelisteRadioKnapper={<OppgavelisteRadioKnapper enhet={enhetsNavn} />}
                                    />
                                )}
                            </form.Field>
                        }
                        velgSak={
                            <form.Field name="sak">
                                {(field) => (
                                    <VelgSak
                                        valgtSak={field.state.value}
                                        setSak={(sak) => field.handleChange(sak)}
                                        error={<ValidationErrorMessage errors={field.state.meta.errors} />}
                                    />
                                )}
                            </form.Field>
                        }
                        avsluttDialogEtterSending={
                            <form.Field name="meldingsType">
                                {(field) => (
                                    <AvsluttDialogEtterSending
                                        meldingsType={field.state.value}
                                        setMeldingsType={(meldingsType) => field.handleChange(meldingsType)}
                                    />
                                )}
                            </form.Field>
                        }
                    />
                    <HStack gap="2">
                        <Button type="submit" loading={isPending}>
                            Send til {brukerNavn}
                        </Button>
                        <Button type="button" variant="secondary" as={Link} to="/new/person/meldinger">
                            Se all kommunikasjon
                        </Button>
                    </HStack>
                    {isSuccess && <Alert variant="success">Meldingen ble sendt</Alert>}
                    {error && <Alert variant="error">{error}</Alert>}
                </VStack>
            </form>
        </Card>
    );
}

function ValidationErrorMessage({ errors }: { errors: ValidationError[] }) {
    return errors.isNotEmpty() ? <ErrorMessage>{buildErrorMessage(errors)}</ErrorMessage> : null;
}

function buildErrorMessage(errors: ValidationError[]) {
    return errors.isNotEmpty() ? errors.join(', ') : null;
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
                erOppgaveTilknyttetAnsatt: value.oppgaveliste === Oppgaveliste.MinListe
            };
            break;
        case MeldingsType.Infomelding:
            request = {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                avsluttet: true
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
