import {
    Alert,
    Box,
    Button,
    Checkbox,
    type ComboboxProps,
    HStack,
    Loader,
    Modal,
    Select,
    Textarea,
    UNSAFE_Combobox,
    VStack
} from '@navikt/ds-react';
import { useForm } from '@tanstack/react-form';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useRef, useState } from 'react';
import { AlertBanner } from 'src/components/AlertBanner';
import { useGsakTemaer } from 'src/components/Meldinger/List/utils';
import { OpprettOppgaveRequestDTOPrioritetKode, PrioritetKode } from 'src/generated/modiapersonoversikt-api';
import {
    useAnsattePaaEnhet,
    useForeslotteEnheter,
    useInnloggetSaksbehandler,
    useOppgaveBehandlerEnheter,
    useOppgaveMutation
} from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { z } from 'zod';
import ErrorBoundary from '../ErrorBoundary';
import { eldsteMelding } from './List/utils';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    traad: Traad;
};

export const OppgaveModal = ({ open, setOpen, traad }: Props) => {
    return (
        <Modal
            header={{ heading: 'Opprett oppgave' }}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            closeOnBackdropClick
            style={{
                minWidth: 'min(90vw, 50em)'
            }}
        >
            <Modal.Body>
                <Box.New overflowY="scroll" paddingInline="4">
                    <Suspense
                        fallback={
                            <HStack justify="center" align="center">
                                <Loader size="3xlarge" />
                            </HStack>
                        }
                    >
                        <ErrorBoundary boundaryName="oppgaveForm">
                            {open && <OppgaveForm traad={traad} onSuccess={() => setOpen(false)} />}
                        </ErrorBoundary>
                    </Suspense>
                </Box.New>
            </Modal.Body>
        </Modal>
    );
};

const oppgaveFormValidator = z.object({
    valgtTema: z.string().nonempty('Tema er påkrevd'),
    valgtUnderkategori: z.string(),
    valgtOppgavetype: z.string().nonempty('Oppgavetype er påkrevd'),
    minListe: z.boolean().optional(),
    beskrivelse: z.string().nonempty('Oppgaven må ha en beskrivelse'),
    valgtPrioritet: z.nativeEnum(PrioritetKode, {
        message: 'Prioritet må være valgt'
    }),
    valgtEnhet: z.string().nonempty('Oppgaven må tilegnes en enhet'),
    valgtAnsatt: z.string().optional(),
    dagerFrist: z.number().optional()
});

type OppgaveFormValue = z.infer<typeof oppgaveFormValidator>;

const OppgaveForm = ({ traad, onSuccess }: { traad: Traad; onSuccess: () => void }) => {
    const errorSummaryRef = useRef<HTMLDivElement>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom);
    const { data: veileder, errorMessages } = useInnloggetSaksbehandler();
    const { mutateAsync, error, isError } = useOppgaveMutation();
    const brukersEnhet = enhet ?? '-';
    const brukerIdent = veileder?.ident;

    const form = useForm({
        defaultValues: {
            valgtTema: '',
            valgtUnderkategori: '',
            valgtOppgavetype: '',
            valgtEnhet: '',
            valgtAnsatt: '',
            valgtPrioritet: '' as PrioritetKode,
            beskrivelse: '',
            minListe: false,
            dagerFrist: 0
        } as OppgaveFormValue,
        validators: {
            onSubmit: oppgaveFormValidator,
            onBlur: hasSubmitted ? oppgaveFormValidator : undefined
        },
        canSubmitWhenInvalid: true,
        onSubmit: async ({ value }) => {
            trackGenereltUmamiEvent(trackingEvents.opprettOppgave);
            await mutateAsync(
                {
                    body: {
                        fnr,
                        opprettetavenhetsnummer: brukersEnhet,
                        valgtEnhetId: brukersEnhet,
                        behandlingskjedeId: traad ? eldsteMelding(traad).id : 'UKJENT',
                        dagerFrist: value.dagerFrist ?? 0,
                        ansvarligIdent: value.valgtAnsatt,
                        ansvarligEnhetId: value.valgtEnhet,
                        temaKode: value.valgtTema,
                        underkategoriKode: value.valgtUnderkategori,
                        oppgaveTypeKode: value.valgtOppgavetype,
                        prioritetKode: OpprettOppgaveRequestDTOPrioritetKode[value.valgtPrioritet],
                        beskrivelse: value.beskrivelse
                    }
                },
                {
                    onSuccess: onSuccess
                }
            );
        }
    });

    const { data: gsakTema } = useGsakTemaer();
    return (
        <form
            onSubmit={async (e) => {
                setHasSubmitted(true);
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();

                errorSummaryRef.current?.focus();
            }}
        >
            <VStack gap="4">
                <AlertBanner alerts={errorMessages} />
                <VStack gap="4" justify="space-between">
                    <form.Field name="valgtTema">
                        {(field) => (
                            <Select
                                id={field.name}
                                className="flex-1"
                                size="small"
                                label="Tema"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                error={field.state.meta.errors.firstOrNull()?.message}
                            >
                                <option value="" disabled>
                                    -- Velg tema --
                                </option>
                                {gsakTema.map((tema) => (
                                    <option value={tema.kode} key={tema.kode}>
                                        {tema.tekst}
                                    </option>
                                ))}
                            </Select>
                        )}
                    </form.Field>

                    <form.Subscribe selector={(f) => [f.values.valgtTema]}>
                        {([valgtTema]) => {
                            const underKategorier = gsakTema.find((t) => t.kode === valgtTema)?.underkategorier ?? [];

                            return (
                                <form.Field name="valgtUnderkategori">
                                    {(field) => (
                                        <Select
                                            id={field.name}
                                            className="flex-1"
                                            size="small"
                                            label="Gjelder"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            error={field.state.meta.errors.firstOrNull()?.message}
                                        >
                                            <option value="" disabled={underKategorier.length === 0}>
                                                {underKategorier.length ? 'Ingen underkategori' : '-- Velg et tema --'}
                                            </option>
                                            {underKategorier.map((tema) => (
                                                <option value={tema.kode} key={tema.kode}>
                                                    {tema.tekst}
                                                </option>
                                            ))}
                                        </Select>
                                    )}
                                </form.Field>
                            );
                        }}
                    </form.Subscribe>

                    <form.Subscribe selector={(f) => [f.values.valgtTema]}>
                        {([valgtTema]) => {
                            const oppgaveTyper = gsakTema.find((t) => t.kode === valgtTema)?.oppgavetyper ?? [];

                            return (
                                <form.Field
                                    name="valgtOppgavetype"
                                    listeners={{
                                        onChange: ({ value }) => {
                                            if (value) {
                                                const valgtType = oppgaveTyper.find((o) => o.kode === value);
                                                form.setFieldValue('dagerFrist', valgtType?.dagerFrist ?? 0);
                                            }
                                        }
                                    }}
                                >
                                    {(field) => (
                                        <Select
                                            id={field.name}
                                            className="flex-1"
                                            size="small"
                                            label="Oppgavetype"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            error={field.state.meta.errors.firstOrNull()?.message}
                                        >
                                            <option value="" disabled>
                                                {oppgaveTyper.length ? '-- Veg oppgavetype --' : '-- Velg et tema --'}
                                            </option>
                                            {oppgaveTyper.map((oppgave) => (
                                                <option value={oppgave.kode} key={oppgave.kode}>
                                                    {oppgave.tekst}
                                                </option>
                                            ))}
                                        </Select>
                                    )}
                                </form.Field>
                            );
                        }}
                    </form.Subscribe>
                </VStack>

                <form.Field
                    name="minListe"
                    listeners={{
                        onChange: (field) => {
                            if (field.value) {
                                form.setFieldValue('valgtEnhet', brukersEnhet);
                                form.setFieldValue('valgtAnsatt', brukerIdent);
                            } else {
                                form.setFieldValue('valgtEnhet', '');
                                form.setFieldValue('valgtAnsatt', '');
                            }
                        }
                    }}
                >
                    {(field) => (
                        <Checkbox
                            id={field.name}
                            checked={field.state.value}
                            onChange={(e) => field.handleChange(e.target.checked)}
                            value="true"
                        >
                            Sett til min oppgaveliste
                        </Checkbox>
                    )}
                </form.Field>

                <VStack gap="4" justify="space-between">
                    <form.Subscribe
                        selector={(f) =>
                            [
                                f.values.valgtTema,
                                f.values.valgtOppgavetype,
                                f.values.valgtUnderkategori,
                                f.values.minListe
                            ] as const
                        }
                    >
                        {([temaKode, typeKode, underkategori, minListe]) => (
                            <>
                                <form.Field name="valgtEnhet">
                                    {(field) => (
                                        <EnhetSelect
                                            id={field.name}
                                            disabled={minListe}
                                            value={field.state.value}
                                            setValue={field.handleChange}
                                            temakode={temaKode}
                                            typekode={typeKode}
                                            underkategori={underkategori}
                                            label="Velg enhet"
                                            error={field.state.meta.errors.firstOrNull()?.message}
                                            onBlur={field.handleBlur}
                                        />
                                    )}
                                </form.Field>
                            </>
                        )}
                    </form.Subscribe>

                    <form.Subscribe selector={(f) => [f.values.valgtEnhet, f.values.minListe] as const}>
                        {([enhetId, minListe]) => (
                            <form.Field name="valgtAnsatt">
                                {(field) => (
                                    <AnsattSelect
                                        id={field.name}
                                        disabled={minListe}
                                        value={field.state.value}
                                        setValue={(v) => field.handleChange(v)}
                                        label="Velg ansatt"
                                        enhetId={enhetId}
                                        error={field.state.meta.errors.firstOrNull()?.message}
                                        onBlur={field.handleBlur}
                                    />
                                )}
                            </form.Field>
                        )}
                    </form.Subscribe>

                    <form.Subscribe selector={(f) => [f.values.valgtTema]}>
                        {([valgtTema]) => {
                            const prioriteter = gsakTema.find((t) => t.kode === valgtTema)?.prioriteter;

                            return (
                                <form.Field name="valgtPrioritet">
                                    {(field) => (
                                        <Select
                                            id={field.name}
                                            size="small"
                                            label="Prioritering"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value as PrioritetKode)}
                                            onBlur={field.handleBlur}
                                            error={field.state.meta.errors.firstOrNull()?.message}
                                        >
                                            {prioriteter ? (
                                                <>
                                                    <option value="" disabled>
                                                        --Velg prioritering--
                                                    </option>
                                                    {prioriteter.map((p) => (
                                                        <option value={p.kode} key={p.kode}>
                                                            {p.tekst}
                                                        </option>
                                                    ))}
                                                </>
                                            ) : (
                                                <option value="" disabled>
                                                    -- Velg et tema --
                                                </option>
                                            )}
                                        </Select>
                                    )}
                                </form.Field>
                            );
                        }}
                    </form.Subscribe>
                </VStack>

                <form.Field name="beskrivelse">
                    {(field) => (
                        <Textarea
                            id={field.name}
                            error={field.state.meta.errors.firstOrNull()?.message}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                            label="Beskrivelse"
                            minRows={10}
                            resize
                        />
                    )}
                </form.Field>

                {isError && (
                    <Alert variant="error" title="Kunne ikke opprette oppgave">
                        {error}
                    </Alert>
                )}
                <HStack gap="4" align="center" marginBlock="2">
                    <form.Subscribe selector={(f) => [f.isSubmitting, f.canSubmit]}>
                        {([isSubmitting, canSubmit]) => (
                            <Button type="submit" size="small" loading={isSubmitting} disabled={!canSubmit}>
                                Opprett oppgave
                            </Button>
                        )}
                    </form.Subscribe>
                    <Button variant="secondary" size="small" onClick={onSuccess}>
                        Avbryt
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};

const EnhetSelect = ({
    temakode,
    typekode,
    underkategori,
    setValue,
    value,
    error,
    ...props
}: {
    temakode?: string;
    typekode?: string;
    underkategori?: string;
    value?: string;
    setValue: (value: string) => void;
} & Omit<ComboboxProps, 'options' | 'onToggleSelected' | 'selectedOption' | 'size'>) => {
    const { data: enheter = [] } = useOppgaveBehandlerEnheter();
    const { data: foreslotteEnheter = [] } = useForeslotteEnheter({
        temakode,
        typekode,
        underkategori
    });

    const suggestedEnheter = foreslotteEnheter.map((enhet) => ({
        ...enhet,
        enhetNavn: `Foreslått: ${enhet.enhetNavn}`
    }));

    const otherEnheter = enheter.filter((e) => !suggestedEnheter.some((s) => s.enhetId === e.enhetId));

    const enhetOptions = [...suggestedEnheter, ...otherEnheter].map((e) => ({
        label: e.enhetNavn,
        value: e.enhetId
    }));

    const selectedOption = enhetOptions.find((o) => o.value === value);
    return (
        <div data-testid="enhet-select">
            <UNSAFE_Combobox
                size="small"
                options={enhetOptions}
                selectedOptions={selectedOption ? [selectedOption] : []}
                onToggleSelected={(option) => setValue(option)}
                error={error}
                {...props}
            />
        </div>
    );
};

const AnsattSelect = ({
    label,
    enhetId,
    setValue,
    value,
    ...props
}: {
    label: string;
    enhetId: string;
    value?: string;
    setValue: (value: string) => void;
} & Omit<ComboboxProps, 'options' | 'onToggleSelected' | 'selectedOption' | 'size'>) => {
    const { data: ansatte, isLoading } = useAnsattePaaEnhet(enhetId);
    const options =
        ansatte?.map((a) => ({
            label: `${a.fornavn} ${a.etternavn}`,
            value: a.ident
        })) ?? [];

    const selectedOption = options.find((o) => o.value === value);

    useEffect(() => {
        if (value && !isLoading && !selectedOption) {
            setValue('');
        }
    }, [value, isLoading, selectedOption, setValue]);

    return (
        <div data-testid="ansatt-select">
            <UNSAFE_Combobox
                isLoading={isLoading}
                size="small"
                selectedOptions={selectedOption ? [selectedOption] : []}
                options={options}
                label={label}
                onToggleSelected={(option) => setValue(option)}
                {...props}
            />
        </div>
    );
};
