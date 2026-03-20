import { BodyLong, BodyShort, Box, HStack, Spacer, Stepper, VStack } from '@navikt/ds-react';
import { HvaErNyttStep } from 'src/components/NyModia/HvaErNyttStep';
import NyKnapp from 'src/components/NyModia/img/ny-knapp.png';

const IntroStep = () => (
    <VStack gap="space-24">
        <BodyShort weight="semibold">
            Hei! <span aria-hidden>👋</span>
        </BodyShort>
        <BodyShort size="small">
            Vi har gjort noen endringer til Modia personoversikt, og vil gjerne vise deg noe av det!
        </BodyShort>
        <BodyLong size="small">
            Du kan finne igjen denne informasjonen i hovedmenyen på toppen av siden. Her har du også tilgang til en
            utfyllende brukermanual, og muligheten til å gå tilbake til den gamle versjonen av personoversikten.
        </BodyLong>
    </VStack>
);

const TakkStep = () => (
    <HStack gap="space-32" wrap={false}>
        <VStack gap="space-24">
            <BodyShort weight="semibold">Takk for tiden din!</BodyShort>
            <BodyShort size="small">
                Du finner tilbake til denne informasjonen øverst til høyre i hovedmenyen sammen med brukermanualen.
                Herfra kan du også velge å bytte tilbake til den gamle versjonen i en overgangsperiode.
            </BodyShort>
            <BodyLong size="small">
                Vi jobber hele tiden med forbedringer av den nye versjonen, og ønsker gjerne tilbakemeldinger fra dere.
                Vi jobber med å legge til rette for å kunne gjøre dette direkte fra personoversikten.
            </BodyLong>
        </VStack>
        <Box.New borderColor="neutral-subtle" borderWidth="2" borderRadius="8">
            <img width="600px" src={NyKnapp} alt="Bilde av den nye knappen i hovedmenyen" />
        </Box.New>
    </HStack>
);

export const OnboardingStepper = ({
    activeStep,
    setActiveStep
}: {
    activeStep: number;
    setActiveStep: (newStep: number) => void;
}) => {
    const steps = [<IntroStep key="intro" />, <HvaErNyttStep key="nytt" />, <TakkStep key="takk" />];

    return (
        <VStack gap="space-64" paddingInline="space-20" justify="space-between">
            <HStack justify="space-between">
                <Spacer />
                <Stepper
                    id="onboarding-stepper"
                    aria-labelledby="stepper-heading"
                    activeStep={activeStep}
                    onStepChange={setActiveStep}
                    className="text-nowrap grow-1 align-middle"
                    orientation="horizontal"
                >
                    <Stepper.Step href="#">Hei!</Stepper.Step>
                    <Stepper.Step href="#">Hva er nytt?</Stepper.Step>
                    <Stepper.Step href="#">Takk for tiden din!</Stepper.Step>
                </Stepper>
                <Spacer />
            </HStack>
            <Box.New>{steps[activeStep + -1]}</Box.New>
        </VStack>
    );
};
