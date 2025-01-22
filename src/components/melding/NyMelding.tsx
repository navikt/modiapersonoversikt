import { BodyShort, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { EnvelopeClosedIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Temagruppe } from 'src/models/temagrupper';
import VelgTema from 'src/components/melding/VelgTema';
import { MeldingsType, meldingsTyperTekst, VelgMeldingsType } from 'src/components/melding/VelgMeldingsType';
import VelgOppgaveliste, { Oppgaveliste } from 'src/components/melding/VelgOppgaveliste';
import { ValgForMeldingstype } from 'src/components/melding/ValgForMeldingstype';
import VelgSak from 'src/components/melding/VelgSak';
import AvsluttDialogEtterSending from 'src/components/melding/AvsluttDialogEtterSending';
import { FormApi, useForm, useStore } from '@tanstack/react-form';
import { z } from 'zod';
import {
    JournalforingsSak
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { useValgtenhet } from 'src/context/valgtenhet-state';
import saksbehandlersEnheter from 'src/rest/resources/saksbehandlersEnheterResource';
import persondataResource from 'src/rest/resources/persondataResource';
import { capitalizeName } from 'src/utils/string-utils';

interface NyMeldingProps {
    lukkeKnapp?: ReactElement<typeof Button>;
}

function NyMelding({ lukkeKnapp }: NyMeldingProps) {
    const enhetsnavn = useEnhetsnavn();
    const brukernavn = useBrukernavn();

    const schema = nyMeldingSchema();
    const form = useNyMeldingForm(schema, ({ value }) => {
        console.log(value);
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
                        <Heading size="medium">Send ny dialog</Heading>
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
                    <VStack gap="1">
                        <Heading size="small">{meldingsTypeTekst.tittel}</Heading>
                        <BodyShort>{meldingsTypeTekst.beskrivelse}</BodyShort>
                        <form.Field
                            name="melding"
                            children={(field) => (
                                <Textarea
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                            )}
                        />
                    </VStack>
                    <ValgForMeldingstype
                        meldingsType={meldingsType}
                        velgTema={
                            <form.Field
                                name="tema"
                                children={
                                    (field) => {
                                        return <VelgTema
                                            valgtTema={field.state.value}
                                            setValgtTema={(tema) => field.handleChange(tema)}
                                        />;
                                    }
                                }
                            />
                        }
                        velgOppgaveliste={
                            <form.Field
                                name="oppgaveliste"
                                children={
                                    (field) => {
                                        return <VelgOppgaveliste
                                            valgtOppgaveliste={field.state.value}
                                            setValgtOppgaveliste={(oppgaveliste) => field.handleChange(oppgaveliste)}
                                            enhet={enhetsnavn}
                                        />;
                                    }
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
                                    />
                                )}
                            />
                        }
                        avsluttDialogEtterSending={
                            <form.Field
                                name="meldingsType"
                                children={(field) => (
                                    <AvsluttDialogEtterSending
                                        meldingsType={field.state.value}
                                        setMeldingsType={(meldingsType) => field.handleChange(meldingsType)}
                                    />
                                )}
                            />
                        }
                    />
                    <Button type="submit">Send til {brukernavn}</Button>
                    <Button
                        variant="tertiary"
                        icon={<EnvelopeClosedIcon aria-hidden />}
                        iconPosition="left"
                        size="small"
                    >
                        Se alle dialoger
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}

function useEnhetsnavn() {
    const enhetId = useValgtenhet().enhetId;
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
    const meldingSchema = z.object({
        melding: z.string().min(1, 'Må ha en melding')
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
    });

    return z.discriminatedUnion('meldingsType', [
        z.object({
            meldingsType: z.literal(MeldingsType.Referat),
            tema: z.nativeEnum(Temagruppe)
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Samtale),
            oppgaveliste: z.nativeEnum(Oppgaveliste)
        }).merge(sakSchema),
        z.object({
            meldingsType: z.literal(MeldingsType.Infomelding)
        }).merge(sakSchema)
    ]).and(meldingSchema);
}

interface NyMeldingFormOptions {
    meldingsType: MeldingsType;
    melding: string;
    tema?: Temagruppe;
    oppgaveliste?: Oppgaveliste;
    sak?: JournalforingsSak;
}

function useNyMeldingForm(schema: ReturnType<typeof nyMeldingSchema>, onSubmit: (values: {
    value: NyMeldingFormOptions,
    formApi: FormApi<NyMeldingFormOptions, undefined>
}) => void) {
    return useForm<NyMeldingFormOptions>({
        defaultValues: {
            meldingsType: MeldingsType.Referat,
            melding: '',
            tema: undefined,
            oppgaveliste: Oppgaveliste.MinListe,
            sak: undefined
        },
        validators: {
            onSubmit: schema
        },
        onSubmit
    });
}

export default NyMelding;