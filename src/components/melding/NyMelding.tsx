import { EnvelopeClosedIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, ErrorMessage, Heading, HStack, Textarea, VStack } from '@navikt/ds-react';
import { type FieldApi, useForm, useStore } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import type {
    JournalforingsSak
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import AvsluttDialogEtterSending from 'src/components/melding/AvsluttDialogEtterSending';
import { ValgForMeldingstype } from 'src/components/melding/ValgForMeldingstype';
import { MeldingsType, meldingsTyperTekst, VelgMeldingsType } from 'src/components/melding/VelgMeldingsType';
import VelgOppgaveliste, { Oppgaveliste } from 'src/components/melding/VelgOppgaveliste';
import VelgSak from 'src/components/melding/VelgSak';
import VelgTema from 'src/components/melding/VelgTema';
import { type SendMeldingRequestV2, SendMeldingRequestV2TraadType } from 'src/generated/modiapersonoversikt-api';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { Temagruppe } from 'src/models/temagrupper';
import persondataResource from 'src/rest/resources/persondataResource';
import saksbehandlersEnheter from 'src/rest/resources/saksbehandlersEnheterResource';
import { capitalizeName } from 'src/utils/string-utils';
import { z } from 'zod';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import { useAtomValue } from 'jotai';

interface NyMeldingProps {
    lukkeKnapp?: ReactElement<typeof Button>;
}

function NyMelding({ lukkeKnapp }: NyMeldingProps) {
    const fnr = usePersonAtomValue();
    const enhetsId = useAtomValue(aktivEnhetAtom);
    const enhetsNavn = useEnhetsnavn(enhetsId);
    const brukerNavn = useBrukernavn();
    const maksLengdeMelding = 15000;

    const defaultFormOptions: NyMeldingFormOptions = {
        meldingsType: MeldingsType.Referat,
        melding: '',
        tema: undefined,
        oppgaveliste: Oppgaveliste.MinListe,
        sak: undefined,
        fnr: fnr ?? '',
        enhetsId: enhetsId ?? ''
    };
    const { error, mutate, isPending, isSuccess } = $api.useMutation('post', '/rest/v2/dialog/sendmelding', {
        onSuccess: () => {
            form.reset(
                {
                    ...defaultFormOptions,
                    meldingsType: form.state.values.meldingsType
                },
                { keepDefaultValues: true }
            );
        }
    });

    const schema = nyMeldingSchema(maksLengdeMelding);
    const form = useForm({
        defaultValues: defaultFormOptions,
        validators: {
            onSubmit: schema
        },
        onSubmit: ({ value }) => {
            const body = generateRequestBody(value);
            mutate({ body: body });
        }
    });

    const meldingsType = useStore(form.store, (state) => state.values.meldingsType);
    const meldingsTypeTekst = meldingsTyperTekst[meldingsType];

    return (
        <Box
            background="bg-default"
            borderRadius="large"
            borderColor="border-subtle"
            borderWidth="1"
            padding="2"
            maxWidth="30vw"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
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
                    <form.Field name="melding">
                        {(field) => (
                            <Textarea
                                label={meldingsTypeTekst.tittel}
                                description={meldingsTypeTekst.beskrivelse}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={errorMesageForField(field)}
                                maxLength={maksLengdeMelding}
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
                                        error={errorComponentForField(field)}
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
                                        enhet={enhetsNavn}
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
                                        error={errorComponentForField(field)}
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
                    <Button type="submit" loading={isPending}>
                        Send til {brukerNavn}
                    </Button>
                    <Button
                        type="button"
                        variant="tertiary"
                        icon={<EnvelopeClosedIcon aria-hidden />}
                        iconPosition="left"
                        size="small"
                        as={Link}
                        to="/new/person/meldinger"
                    >
                        Se alle dialoger
                    </Button>
                    {isSuccess && <Alert variant="success">Meldingen ble sendt</Alert>}
                    {error && <Alert variant="error">{error}</Alert>}
                </VStack>
            </form>
        </Box>
    );
}

// Funksjonen forventer at parameteren allerede er validert
function generateRequestBody(value: NyMeldingFormOptions) {
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
                // Tema er validert av schema ved meldingstype Referat
                temagruppe: value.tema!
            };
            break;
        case MeldingsType.Samtale:
            request = {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                avsluttet: false,
                // Oppgaveliste er validert av schema ved meldingstype Samtale
                erOppgaveTilknyttetAnsatt: value.oppgaveliste! === Oppgaveliste.MinListe
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

function errorMesageForField(field: FieldApi<NyMeldingFormOptions, any>) {
    return field.state.meta.errors.isNotEmpty() ? field.state.meta.errors.join(', ') : null;
}

function errorComponentForField(field: FieldApi<NyMeldingFormOptions, any>) {
    return field.state.meta.errors.isNotEmpty() ? <ErrorMessage>{errorMesageForField(field)}</ErrorMessage> : null;
}

function useEnhetsnavn(enhetId: string | undefined) {
    const enheter = saksbehandlersEnheter.useFetch().data?.enhetliste ?? [];
    return enheter.find((enhet) => enhet.enhetId === enhetId)?.navn ?? 'Ukjent enhet';
}

function useBrukernavn() {
    const brukerResource = persondataResource.useFetch();
    return brukerResource.data
        ? capitalizeName(brukerResource.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';
}

function nyMeldingSchema(maksLengdeMelding: number) {
    const commonSchema = z.object({
        melding: z
            .string()
            .nonempty('Du kan ikke sende en tom melding til bruker')
            .max(maksLengdeMelding, 'Du kan ikke sende en melding som er lenger enn 15.000 tegn'),
        fnr: z.string(),
        enhetsId: z.string()
    });

    const sakSchema = z.object(
        {
            fagsystemKode: z.string(),
            fagsystemNavn: z.string(),
            fagsystemSaksId: z.string().nullable(),
            finnesIGsak: z.boolean(),
            finnesIPsak: z.boolean(),
            opprettetDato: z.string().nullable(),
            saksId: z.string(),
            saksIdVisning: z.string(),
            sakstype: z.string().nullable(),
            sakstypeForVisningGenerell: z.boolean(),
            temaKode: z.string(),
            temaNavn: z.string(),
            syntetisk: z.boolean().nullable().optional()
        },
        { message: 'Meldingen må knyttes til en sak' }
    );

    return z
        .discriminatedUnion('meldingsType', [
            z.object({
                meldingsType: z.literal(MeldingsType.Referat),
                tema: z.nativeEnum(Temagruppe, { message: 'Meldingen må knyttes til et tema' })
            }),
            z.object({
                meldingsType: z.literal(MeldingsType.Samtale),
                oppgaveliste: z.nativeEnum(Oppgaveliste),
                sak: sakSchema
            }),
            z.object({
                meldingsType: z.literal(MeldingsType.Infomelding),
                sak: sakSchema
            })
        ])
        .and(commonSchema);
}

interface NyMeldingFormOptions {
    meldingsType: MeldingsType;
    melding: string;
    tema?: Temagruppe;
    oppgaveliste?: Oppgaveliste;
    sak?: JournalforingsSak;
    fnr: string;
    enhetsId: string;
}

export default NyMelding;
