import { Alert, BodyShort, Box, Button, Checkbox, HStack, Textarea, VStack } from '@navikt/ds-react';
import { type ValidationError, useForm } from '@tanstack/react-form';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import DraftStatus from 'src/app/personside/dialogpanel/DraftStatus';
import type { Draft, DraftContext } from 'src/app/personside/dialogpanel/use-draft';
import useDraft from 'src/app/personside/dialogpanel/use-draft';
import { Link } from 'src/components/Link';
import { useSendMelding } from 'src/lib/clients/modiapersonoversikt-api';
import { useEnhetsnavn } from 'src/lib/hooks/useEnhetsnavn';
import { useSuspendingBrukernavn } from 'src/lib/hooks/useSuspendingBrukernavn';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import {
    type SendMeldingRequestV2,
    SendMeldingRequestV2TraadType,
    type Traad,
    TraadType
} from 'src/lib/types/modiapersonoversikt-api';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { formatterDatoTid } from 'src/utils/date-utils';
import type { z } from 'zod';
import { erJournalfort } from '../Meldinger/List/utils';
import { Oppgaveliste, OppgavelisteRadioKnapper } from './OppgavelisteRadioKnapper';
import { MeldingsType, meldingsTyperTekst, traadTypeToMeldingsType } from './VelgMeldingsType';
import VelgOppgaveliste from './VelgOppgaveliste';
import VelgSak from './VelgSak';
import { fortsettDialogSchema, maksLengdeMelding } from './nyMeldingSchema';

type FortsettDialogForm = z.infer<typeof fortsettDialogSchema>;

type Props = {
    traad: Traad;
};
export const FortsettDialog = ({ traad }: Props) => {
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

    const defaultFormOptions = {
        traadId: traad.traadId,
        melding: defaultMessage,
        traadType: traadTypeToMeldingsType(traad.traadType),
        fnr: fnr,
        enhetsId: enhetsId ?? ''
    } as FortsettDialogForm;

    const form = useForm({
        defaultValues: defaultFormOptions,
        validators: {
            onSubmit: fortsettDialogSchema
        },
        onSubmit: ({ value }) => {
            console.log(value);
            const body = generateRequestBody(value as FortsettDialogForm);
            mutate(
                { body: body },
                {
                    onSuccess: () => {
                        removeDraft();
                    }
                }
            );
        }
    });

    const meldingsType = traadTypeToMeldingsType(traad.traadType);
    const meldingsTypeTekst = meldingsTyperTekst[meldingsType];
    const erSamtalereferat = traad.traadType === TraadType.SAMTALEREFERAT;
    const erOksosTraad = traad.meldinger.some((it) => it.temagruppe === 'OKSOS');
    const visVelgSak = !erJournalfort(traad) && !erOksosTraad;

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
            }}
        >
            <VStack gap="2">
                <Box.New
                    padding="2"
                    background="sunken"
                    borderColor="neutral-subtle"
                    borderWidth="1"
                    borderRadius="medium"
                >
                    <VStack gap="2">
                        <BodyShort>
                            <span className="font-semibold">Tema: </span>
                            {temagruppeTekst(traad.temagruppe as Temagruppe)}
                        </BodyShort>
                        {traad.opprettetDato && (
                            <BodyShort>
                                Opprettet:{' '}
                                <span className="text-text-subtle">{formatterDatoTid(traad.opprettetDato)}</span>
                            </BodyShort>
                        )}
                        <Link to="/new/person/meldinger" search={{ traadId: traad.traadId }}>
                            Gå til dialog
                        </Link>
                    </VStack>
                </Box.New>
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
                                autoFocus
                                label="Ny melding i dialog"
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
                {visVelgSak && (
                    <form.Field name="sak">
                        {(field) => (
                            <VelgSak
                                valgtSak={field.state.value}
                                setSak={(sak) => field.handleChange(sak)}
                                //error={<ValidationErrorMessage errors={field.state.meta.errors} />}
                            />
                        )}
                    </form.Field>
                )}
                {!erSamtalereferat && (
                    <>
                        <form.Field name="avsluttet">
                            {(field) => (
                                <Checkbox
                                    checked={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.checked)}
                                >
                                    Avslutt samtale etter sending
                                </Checkbox>
                            )}
                        </form.Field>
                        <form.Subscribe selector={(s) => s.values.avsluttet}>
                            {(avsluttet) =>
                                !avsluttet ? (
                                    <form.Field name="oppgaveliste">
                                        {(field) => (
                                            <VelgOppgaveliste
                                                valgtOppgaveliste={field.state.value}
                                                setValgtOppgaveliste={(oppgaveliste) =>
                                                    field.handleChange(oppgaveliste)
                                                }
                                                oppgavelisteRadioKnapper={
                                                    <OppgavelisteRadioKnapper enhet={enhetsNavn} />
                                                }
                                            />
                                        )}
                                    </form.Field>
                                ) : (
                                    <Alert variant="info">Bruker kan ikke skrive mer i denne samtalen</Alert>
                                )
                            }
                        </form.Subscribe>
                    </>
                )}
                <HStack gap="2" justify="center">
                    <Button type="submit" loading={isPending}>
                        Send til {brukerNavn}
                    </Button>
                </HStack>
                {isSuccess && <Alert variant="success">Meldingen ble sendt</Alert>}
                {error && <Alert variant="error">{error}</Alert>}
            </VStack>
        </form>
    );
};

function generateRequestBody(value: z.infer<typeof fortsettDialogSchema>) {
    const common: SendMeldingRequestV2 = {
        enhet: value.enhetsId,
        fritekst: value.melding,
        fnr: value.fnr,
        traadType:
            value.traadType === MeldingsType.Samtale
                ? SendMeldingRequestV2TraadType.SAMTALEREFERAT
                : SendMeldingRequestV2TraadType.MELDINGSKJEDE,
        sak: value.sak
    };

    switch (value.traadType) {
        case MeldingsType.Samtale:
            return {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                erOppgaveTilknyttetAnsatt: value.oppgaveliste === Oppgaveliste.MinListe
            };
        case MeldingsType.Referat:
            return {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                avsluttet: true
            };
    }
}
function buildErrorMessage(errors: ValidationError[]) {
    return errors.isNotEmpty() ? errors.join(', ') : null;
}
