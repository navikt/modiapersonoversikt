import { BodyLong, BodyShort, Box, Stepper, VStack } from '@navikt/ds-react';
import { HvaErNyttStep } from 'src/components/NyModia/HvaErNyttStep';

const IntroStep = () => (
    <VStack gap="6">
        <BodyShort className="font-ax-bold">
            Hei! <span aria-hidden>👋</span>
        </BodyShort>
        <BodyShort>Vi har gjort noen endringer til Modia personoversikt, og vil gjerne vise deg noe av det!</BodyShort>
        <BodyLong>
            Du kan finne igjen denne informasjonen øverst i høyre hjørne. Her har du også tilgang til en utfyllende
            brukermanual, og mulighet til å gi oss tilbakemeldinger på den nye versjonen.
        </BodyLong>
    </VStack>
);

const TakkStep = () => (
    <VStack gap="6">
        <BodyShort className="font-ax-bold">Takk for tiden din!</BodyShort>
        <BodyShort>
            Du finner tilbake til denne informasjonen øverst til høyre i toppmeny sammen med brukermanualen.
        </BodyShort>
        <BodyLong>
            Vi kommer til å jobbe med forbedringer av denne nye versjonen kontinuerlig, og ønsker gjerne
            tilbakemeldinger fra dere! Det kan dere gjøre ved å klikke på knappen øverst til høyre i menyen.
        </BodyLong>
    </VStack>
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
        <VStack gap="8" padding="space-20">
            <Stepper
                aria-labelledby="stepper-heading"
                activeStep={activeStep}
                onStepChange={setActiveStep}
                className="text-nowrap"
                orientation="horizontal"
            >
                <Stepper.Step href="#">Hei!</Stepper.Step>
                <Stepper.Step href="#">Hva er nytt?</Stepper.Step>
                <Stepper.Step href="#">Takk for tiden din!</Stepper.Step>
            </Stepper>
            <Box.New>{steps[activeStep + -1]}</Box.New>
        </VStack>
    );
};
