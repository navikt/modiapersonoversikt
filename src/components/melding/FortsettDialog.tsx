import { Bleed, Box, Button, Checkbox, HStack, InlineMessage, Loader, VStack } from '@navikt/ds-react';
import { useForm, type ValidationError } from '@tanstack/react-form';
import { useSearch } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo, useRef, useState } from 'react';
import DraftStatus from 'src/app/personside/dialogpanel/DraftStatus';
import type { Draft, DraftContext } from 'src/app/personside/dialogpanel/use-draft';
import useDraft from 'src/app/personside/dialogpanel/use-draft';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { Link } from 'src/components/Link';
import { AvbrytAlert } from 'src/components/melding/BetaKommunikasjon/AvbrytAlert';
import AutoCompleteTekstTips from 'src/components/melding/standardtekster/AutoCompleteTekstTips';
import StandardTekstModal from 'src/components/melding/standardtekster/StandardTeksterModal';
import { settInnStandardTekst } from 'src/components/melding/standardtekster/settInnStandardTekst';
import { useNyesteVurderSvarOppgaveForTraad, useSendMelding } from 'src/lib/clients/modiapersonoversikt-api';
import { useSuspendingBrukernavn } from 'src/lib/hooks/useSuspendingBrukernavn';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import { overskridKontaktReservasjonAtom, svarUnderArbeidAtom, useDisableDialog } from 'src/lib/state/dialog';
import {
    type SendMeldingRequestV2,
    SendMeldingRequestV2TraadType,
    type Traad,
    TraadType
} from 'src/lib/types/modiapersonoversikt-api';
import { trackFortsettDialog } from 'src/utils/analytics';
import type { z } from 'zod';
import AutocompleteTextarea from './AutoCompleteTextarea';
import { fortsettDialogSchema, maksLengdeMelding } from './nyMeldingSchema';
import { Oppgaveliste } from './OppgavelisteOptions';
import { useTraadHenvendelse } from './useHenvendelse';
import { meldingsTyperTekst, traadTypeToMeldingsType } from './VelgMeldingsType';
import VelgOppgaveliste from './VelgOppgaveliste';

type FortsettDialogForm = z.infer<typeof fortsettDialogSchema>;

type Props = {
    traad: Traad;
};

export const FortsettDialog = ({ traad }: Props) => {
    const fnr = usePersonAtomValue();
    const enhetsId = useAtomValue(aktivEnhetAtom);
    const setDialogUnderArbeid = useSetAtom(svarUnderArbeidAtom);
    const brukerNavn = useSuspendingBrukernavn();
    const oppgaveForTraad = useNyesteVurderSvarOppgaveForTraad(traad.traadId);
    const disableDialog = useDisableDialog();
    const setOverskridKontaktReservasjon = useSetAtom(overskridKontaktReservasjonAtom);
    const { mutate, isPending } = useSendMelding();
    const search = useSearch({ from: '/new/person/meldinger', shouldThrow: false });
    const { isOn: isNyKommunikasjonEnabled } = useFeatureToggle(FeatureToggles.NyKommunikasjon);

    const erValgtTraad = !search?.traadId || search?.traadId === traad.traadId;

    // Brukes for å sette initialverdien til meldingen basert på draften
    const [defaultMessage, setDefaultMessage] = useState('');
    const draftLoader = useCallback((draft: Draft) => setDefaultMessage(draft.content), []);
    const draftContext: DraftContext = useMemo(() => ({ fnr }), [fnr]);

    const { update: updateDraft, remove: removeDraft, status: draftStatus } = useDraft(draftContext, draftLoader);

    const defaultFormOptions = {
        traadId: traad.traadId,
        melding: defaultMessage,
        fnr: fnr,
        enhetsId: enhetsId ?? '',
        oppgaveliste: Oppgaveliste.MinListe
    } as FortsettDialogForm;

    const { data: henvendelse, isPending: henvendelsePending } = useTraadHenvendelse(traad);

    const oppgaveId = oppgaveForTraad?.oppgaveId ?? henvendelse?.oppgaveId;

    const form = useForm({
        defaultValues: defaultFormOptions,
        validators: {
            onSubmit: fortsettDialogSchema
        },
        onSubmit: ({ value }) => {
            trackFortsettDialog(meldingsTyperTekst[meldingsType].tittel.toLowerCase());
            const body = generateRequestBody(value as FortsettDialogForm, traad, oppgaveId, henvendelse?.behandlingsId);
            mutate(
                { body: body },
                {
                    onSuccess: () => {
                        removeDraft();
                        form.reset(
                            {
                                ...defaultFormOptions,
                                melding: ''
                            },
                            { keepDefaultValues: true }
                        );
                        setDialogUnderArbeid(undefined);
                        setOverskridKontaktReservasjon(false);
                    }
                }
            );
        }
    });

    const meldingsType = traadTypeToMeldingsType(traad.traadType);
    const meldingsTypeTekst = meldingsTyperTekst[meldingsType];
    const erSamtalereferat = traad.traadType === TraadType.SAMTALEREFERAT;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    if (henvendelsePending) {
        return (
            <HStack align="center" justify="center">
                <Loader size="medium" />
            </HStack>
        );
    }

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
            }}
        >
            <VStack gap="space-16">
                {!erValgtTraad && (
                    <InlineMessage size="small" status="warning" className="mt-2">
                        Dialogen du nå svarer til, er ikke den som vises til venstre.
                        <Link
                            to="/new/person/meldinger"
                            className="text-ax-medium cursor-pointer"
                            search={{ traadId: traad.traadId }}
                        >
                            Gå til aktuell dialog
                        </Link>
                    </InlineMessage>
                )}
                {!erSamtalereferat && (
                    <>
                        <form.Field name="avsluttet">
                            {(field) => (
                                <Checkbox
                                    disabled={disableDialog}
                                    checked={field.state.value}
                                    size="small"
                                    onChange={(e) => field.handleChange(e.target.checked)}
                                >
                                    Avslutt dialog etter sending
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
                                            />
                                        )}
                                    </form.Field>
                                ) : (
                                    <InlineMessage status="warning" size="small">
                                        Bruker kan ikke skrive mer i denne samtalen
                                    </InlineMessage>
                                )
                            }
                        </form.Subscribe>
                    </>
                )}
                <VStack gap="space-4">
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
                                <Box height="30px">
                                    {draftStatus &&
                                        form.getFieldValue('melding').length > 0 &&
                                        form.getFieldMeta('melding')?.isDirty && <DraftStatus state={draftStatus} />}
                                </Box>
                                <AutocompleteTextarea
                                    disabled={disableDialog}
                                    autoFocus
                                    hideLabel
                                    ref={textAreaRef}
                                    size="small"
                                    label="Ny melding i dialog"
                                    description={meldingsTypeTekst.beskrivelse}
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

                    <Bleed
                        marginBlock={{
                            xs: 'space-0 space-0',
                            md: disableDialog ? 'space-0 space-0' : 'space-20 space-0'
                        }}
                        asChild
                    >
                        <HStack gap="space-4" justify="end">
                            <Box height="15px" width="100px" />
                            <HStack justify="end" wrap={false}>
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
                            <HStack justify="end" gap="space-8" align="center" flexGrow="1" maxWidth="fit-content">
                                <Button
                                    type="submit"
                                    data-testid="svar-knapp-fortsett-dialog"
                                    size="small"
                                    className="text-nowrap"
                                    disabled={disableDialog || isPending}
                                    loading={isPending}
                                >
                                    Send til {brukerNavn} {oppgaveId ? 'og avslutt oppgave' : ''}
                                </Button>
                                {isNyKommunikasjonEnabled ? (
                                    <AvbrytAlert
                                        handleAvbryt={() => {
                                            removeDraft();
                                            setDialogUnderArbeid(undefined);
                                        }}
                                    />
                                ) : (
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        data-color="danger"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDialogUnderArbeid(undefined);
                                        }}
                                    >
                                        Avbryt
                                    </Button>
                                )}
                            </HStack>
                        </HStack>
                    </Bleed>
                </VStack>
            </VStack>
        </form>
    );
};

function generateRequestBody(
    value: z.infer<typeof fortsettDialogSchema>,
    traad: Traad,
    oppgaveId?: string,
    behandlingsId?: string
) {
    const common: SendMeldingRequestV2 = {
        enhet: value.enhetsId,
        fritekst: value.melding,
        fnr: value.fnr,
        traadType: SendMeldingRequestV2TraadType[traad.traadType],
        traadId: traad.traadId,
        temagruppe: traad.temagruppe,
        behandlingsId,
        oppgaveId
    };

    switch (common.traadType) {
        case SendMeldingRequestV2TraadType.SAMTALEREFERAT:
            return {
                ...common,
                erOppgaveTilknyttetAnsatt: true,
                avsluttet: value.avsluttet
            };
        default:
            return {
                ...common,
                erOppgaveTilknyttetAnsatt: value.avsluttet ? false : value.oppgaveliste === Oppgaveliste.MinListe,
                avsluttet: value.avsluttet,
                sak: value.sak
            };
    }
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
