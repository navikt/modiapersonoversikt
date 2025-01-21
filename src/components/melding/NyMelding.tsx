import { BodyShort, Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { EnvelopeClosedIcon } from '@navikt/aksel-icons';
import { ReactElement, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Temagruppe } from 'src/models/temagrupper';
import VelgTema from 'src/components/melding/VelgTema';
import { MeldingsType, meldingsTyperTekst, VelgMeldingsType } from 'src/components/melding/VelgMeldingsType';
import VelgOppgaveliste, { Oppgaveliste } from 'src/components/melding/VelgOppgaveliste';
import { ValgForMeldingstype } from 'src/components/melding/ValgForMeldingstype';
import VelgSak from 'src/components/melding/VelgSak';
import AvsluttDialogEtterSending from 'src/components/melding/AvsluttDialogEtterSending';

interface NyMeldingProps {
    lukkeKnapp?: ReactElement<typeof Button>;
}

function NyMelding({ lukkeKnapp }: NyMeldingProps) {
    const enhet = 'NAV'; // TODO: hent fra context
    const bruker = 'Ola Nordmann'; // TODO: hent fra context

    const [meldingsType, setMeldingsType] = useState<MeldingsType>(MeldingsType.Referat);
    const meldingsTypeTekst = meldingsTyperTekst[meldingsType];

    const [melding, setMelding] = useState('');

    const [valgtTema, setValgtTema] = useState<Temagruppe | undefined>();

    const [valgtOppgaveliste, setValgtOppgaveliste] = useState<Oppgaveliste>(Oppgaveliste.MinListe);


    return (
        <Box
            background="bg-default"
            borderRadius="large"
            borderColor="border-subtle"
            borderWidth="1"
            padding="2"
            maxWidth="30vw"
        >
            <VStack gap="4">
                <HStack justify="space-between">
                    <Heading size="medium">Send ny dialog</Heading>
                    {lukkeKnapp}
                </HStack>
                <VelgMeldingsType
                    meldingsType={meldingsType}
                    setMeldingsType={setMeldingsType}
                />
                <VStack gap="1">
                    <Heading size="small">{meldingsTypeTekst.tittel}</Heading>
                    <BodyShort>{meldingsTypeTekst.beskrivelse}</BodyShort>
                    <Textarea
                        value={melding}
                        onChange={(e) =>
                            setMelding(e.target.value)
                        }

                    />
                </VStack>
                <ValgForMeldingstype
                    meldingsType={meldingsType}
                    velgTema={
                        <VelgTema valgtTema={valgtTema} setValgtTema={setValgtTema} />
                    }
                    velgOppgaveliste={
                        <VelgOppgaveliste
                            valgtOppgaveliste={valgtOppgaveliste}
                            setValgtOppgaveliste={setValgtOppgaveliste}
                            enhet={enhet}
                        />
                    }
                    velgSak={<VelgSak />}
                    avsluttDialogEtterSending={
                        <AvsluttDialogEtterSending
                            meldingsType={meldingsType}
                            setMeldingsType={setMeldingsType}
                        />
                    }
                />
                <Button>Send til {bruker}</Button>
                <Button
                    variant="tertiary"
                    icon={<EnvelopeClosedIcon aria-hidden />}
                    iconPosition="left"
                    size="small"
                >
                    Se alle dialoger
                </Button>
            </VStack>
        </Box>
    );
}

export default NyMelding;