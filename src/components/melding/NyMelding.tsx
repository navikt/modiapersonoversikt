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
import { useForm, useStore } from '@tanstack/react-form';
import { z } from 'zod';

interface NyMeldingProps {
    lukkeKnapp?: ReactElement<typeof Button>;
}

interface NyMeldingFormOptions {
    meldingsType: MeldingsType;
    melding: string;
    tema?: Temagruppe;
    oppgaveliste?: Oppgaveliste;
}

function NyMelding({ lukkeKnapp }: NyMeldingProps) {
    const enhet = 'NAV'; // TODO: hent fra context
    const bruker = 'Ola Nordmann'; // TODO: hent fra context

    const schema = nyMeldingSchema();

    const form = useForm<NyMeldingFormOptions>({
        defaultValues: {
            meldingsType: MeldingsType.Referat,
            melding: '',
            tema: undefined,
            oppgaveliste: Oppgaveliste.MinListe
        },
        validators: {
            onSubmit: schema
        },
        onSubmit: (values) => {
            console.log(values.value);
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
                                            enhet={enhet}
                                        />;
                                    }
                                }
                            />
                        }
                        velgSak={<VelgSak />}
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
                    <Button type="submit">Send til {bruker}</Button>
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

function nyMeldingSchema() {
    const meldingSchema = z.object({
        melding: z.string().min(1, 'Må ha en melding')
    });

    return z.discriminatedUnion('meldingsType', [
        z.object({
            meldingsType: z.literal(MeldingsType.Referat),
            tema: z.nativeEnum(Temagruppe)
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Samtale),
            // TODO: Sak
            oppgaveliste: z.nativeEnum(Oppgaveliste)
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Infomelding)
            // TODO: Sak
        })
    ]).and(meldingSchema);
}

export default NyMelding;