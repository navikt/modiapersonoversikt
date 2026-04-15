import { BodyLong, Box, Button, Heading, InlineMessage, Modal, VStack } from '@navikt/ds-react';
import { type LumiSurveyConfig, LumiSurveyDock, type LumiSurveyTransport } from '@navikt/lumi-survey';
import { atom, useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { apiBaseUri, postConfig } from 'src/api/config';
import { nyModiaAtom } from 'src/components/NyModia';
import { trackToggleNyModia } from 'src/utils/analytics';
import { lumiStorageStrategy } from './lumiStorageUtils';

const mySurvey = {
    type: 'rating',
    questions: [
        {
            id: 'comment',
            type: 'text',
            prompt:
                'Vi jobber kontinuerlig med å forbedre den nye versjonen av Modia og lurer på hvorfor du bytter ' +
                'tilbake til den gamle? Meldingen din er anonym, og kan ikke besvares',
            maxLength: 1000,
            placeholder: 'Skriv her...'
        }
    ]
} satisfies LumiSurveyConfig;

export const openGamleModiaFeedbackModalAtom = atom<boolean>(false);

export const LumiGamleModiaModal = () => {
    const [open, setOpen] = useAtom(openGamleModiaFeedbackModalAtom);
    const [submitted, setSubmitted] = useState(false);
    const [, setNyModia] = useAtom(nyModiaAtom);

    const transport = useRef<LumiSurveyTransport>({
        async submit(submission) {
            await fetch(`${apiBaseUri}/lumi/feedback`, postConfig(submission.transportPayload));
            setSubmitted(true);
        }
    }).current;

    const handleClose = () => {
        setOpen(false);
        setSubmitted(false);
    };

    const handleProceed = () => {
        setNyModia(false);
        trackToggleNyModia(false);
        handleClose();
    };

    return (
        <Modal
            className="w-[600px] max-w-[99%]"
            aria-labelledby="lumi-gamle-modia-header"
            open={open}
            onClose={handleClose}
        >
            <Modal.Header>
                <Heading id="lumi-gamle-modia-header" size="medium">
                    Hei!
                </Heading>
            </Modal.Header>
            <Modal.Body>
                {submitted ? (
                    <VStack gap="space-4">
                        <BodyLong>Takk for tilbakemeldingen! 🎉</BodyLong>
                    </VStack>
                ) : (
                    <Box className="lumi-survey-container">
                        <VStack gap="space-8">
                            <LumiSurveyDock
                                surveyId="modiapersonoversikt-bytt-til-gammel"
                                survey={mySurvey}
                                success={{ autoClose: true, autoCloseDelayMs: 0 }}
                                transport={transport}
                                behavior={{
                                    showPersonalDataNotice: false,
                                    storageStrategy: lumiStorageStrategy,
                                    dismissCooldownDays: 30
                                }}
                                style={{ containerClassName: '!w-full', panelClassName: '!w-full !max-w-full' }}
                            />
                            <InlineMessage status="warning">
                                Ikke skriv inn navn eller andre personopplysninger.
                            </InlineMessage>
                        </VStack>
                    </Box>
                )}
            </Modal.Body>
            {submitted && (
                <Modal.Footer>
                    <Button type="button" size="small" variant="primary" onClick={handleProceed}>
                        Gå til gamle Modia
                    </Button>
                </Modal.Footer>
            )}
            {!submitted && (
                <Modal.Footer>
                    <Button type="button" size="small" variant="tertiary" onClick={handleProceed}>
                        Hopp over og gå til gamle Modia
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};
