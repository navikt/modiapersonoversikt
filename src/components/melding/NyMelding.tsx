import { Alert, Box, Button, ErrorMessage, Heading, HStack, Textarea, VStack } from '@navikt/ds-react';
import { EnvelopeClosedIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { Temagruppe } from 'src/models/temagrupper';
import VelgTema from 'src/components/melding/VelgTema';
import { MeldingsType, meldingsTyperTekst, VelgMeldingsType } from 'src/components/melding/VelgMeldingsType';
import VelgOppgaveliste, { Oppgaveliste } from 'src/components/melding/VelgOppgaveliste';
import { ValgForMeldingstype } from 'src/components/melding/ValgForMeldingstype';
import VelgSak from 'src/components/melding/VelgSak';
import AvsluttDialogEtterSending from 'src/components/melding/AvsluttDialogEtterSending';
import { FieldApi, useForm, useStore } from '@tanstack/react-form';
import { z } from 'zod';
import {
    JournalforingsSak
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { useValgtenhet } from 'src/context/valgtenhet-state';
import saksbehandlersEnheter from 'src/rest/resources/saksbehandlersEnheterResource';
import persondataResource from 'src/rest/resources/persondataResource';
import { capitalizeName } from 'src/utils/string-utils';
import { useFodselsnummer } from 'src/utils/customHooks';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { type SendMeldingRequestV2, SendMeldingRequestV2TraadType } from 'src/generated/modiapersonoversikt-api';

interface NyMeldingProps {
    lukkeKnapp?: ReactElement<typeof Button>;
}

function NyMelding({ lukkeKnapp }: NyMeldingProps) {
    const fnr = useFodselsnummer();
    const enhetsId = useValgtenhet().enhetId;
    const enhetsNavn = useEnhetsnavn(enhetsId);
    const brukerNavn = useBrukernavn();

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
            form.reset({
                ...defaultFormOptions,
                meldingsType: form.state.values.meldingsType
            }, { keepDefaultValues: true });
        }
    });

    const schema = nyMeldingSchema();
    const form = useForm<NyMeldingFormOptions>({
        defaultValues: defaultFormOptions,
        validators: {
            onSubmit: schema
        },
        onSubmit: ({ value }) => {
            const body = generateRequestBody(value);
            mutate({ body: body });
        }
    });

    const meldingsType = useStore(
        form.store,
        (state) => state.values.meldingsType
    );
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
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}>
                <VStack gap="4">
                    <HStack justify="space-between">
                        <Heading level='1' size="medium">Send ny dialog</Heading>
                        {lukkeKnapp}
                    </HStack>
                    <form.Field
                        name="meldingsType"
                        children={(field) => (
                            <VelgMeldingsType
                                meldingsType={field.state.value}
                                setMeldingsType={(meldingsType) => field.handleChange(meldingsType)}
                            />
                        )}
                    />
                    <form.Field
                        name="melding"
                        children={(field) =>
                            <Textarea
                                label={meldingsTypeTekst.tittel}
                                description={meldingsTypeTekst.beskrivelse}
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                error={errorMesageForField(field)}
                            />
                        }
                    />
                    <ValgForMeldingstype
                        meldingsType={meldingsType}
                        velgTema={
                            <form.Field
                                name="tema"
                                children={
                                    (field) =>
                                        <VelgTema
                                            valgtTema={field.state.value}
                                            setValgtTema={(tema) => field.handleChange(tema)}
                                            error={errorComponentForField(field)}
                                        />
                                }
                            />
                        }
                        velgOppgaveliste={
                            <form.Field
                                name="oppgaveliste"
                                children={
                                    (field) =>
                                        <VelgOppgaveliste
                                            valgtOppgaveliste={field.state.value}
                                            setValgtOppgaveliste={(oppgaveliste) => field.handleChange(oppgaveliste)}
                                            enhet={enhetsNavn}
                                        />
                                }
                            />
                        }
                        velgSak={
                            <form.Field
                                name="sak"
                                children={(field) => (
                                    <VelgSak
                                        valgtSak={field.state.value}
                                        setSak={(sak) => field.handleChange(sak)}
                                        error={errorComponentForField(field)}
                                    />
                                )}
                            />
                        }
                        avsluttDialogEtterSending={
                            <form.Field
                                name="meldingsType"
                                children={(field) =>
                                    <AvsluttDialogEtterSending
                                        meldingsType={field.state.value}
                                        setMeldingsType={(meldingsType) => field.handleChange(meldingsType)}
                                    />
                                }
                            />
                        }
                    />
                    <Button type="submit" loading={isPending}>Send til {brukerNavn}</Button>
                    <Button
                        variant="tertiary"
                        icon={<EnvelopeClosedIcon aria-hidden />}
                        iconPosition="left"
                        size="small"
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
                // Validert av schema
                temagruppe: value.tema!!
            };
            break;
        case MeldingsType.Samtale:
            request = {
                ...common,
                traadType: SendMeldingRequestV2TraadType.MELDINGSKJEDE,
                avsluttet: false
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
    return field.state.meta.errors.isNotEmpty() ?
        <ErrorMessage>{errorMesageForField(field)}</ErrorMessage> : null;
}

function useEnhetsnavn(enhetId: string) {
    const enheter = saksbehandlersEnheter.useFetch().data?.enhetliste ?? [];
    return enheter.find((enhet) => enhet.enhetId === enhetId)?.navn ?? 'Ukjent enhet';
}

function useBrukernavn() {
    const brukerResource = persondataResource.useFetch();
    return brukerResource.data
        ? capitalizeName(brukerResource.data.person.navn.firstOrNull()?.fornavn || '')
        : 'bruker';
}

function nyMeldingSchema() {
    const commonSchema = z.object({
        melding: z.string().min(1, 'Må ha en melding'),
        fnr: z.string().length(11, 'Må ha et gyldig fødselsnummer'),
        enhetsId: z.string().length(4, 'Må ha gyldig enhetsId')
    });

    const sakSchema = z.object({
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
    }, { message: 'Må velge en sak' });

    return z.discriminatedUnion('meldingsType', [
        z.object({
            meldingsType: z.literal(MeldingsType.Referat),
            tema: z.nativeEnum(Temagruppe, { message: 'Må velge et tema' })
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
    ]).and(commonSchema);
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