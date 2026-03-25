import { BodyLong, Box, Button, Heading, InlineMessage, Modal, VStack } from '@navikt/ds-react';
import { type LumiSurveyConfig, LumiSurveyDock, type LumiSurveyTransport } from '@navikt/lumi-survey';
import { atom, useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { apiBaseUri, postConfig } from 'src/api/config';

const mySurvey = {
    type: 'rating',
    questions: [
        {
            id: 'comment',
            type: 'text',
            prompt:
                'Din tilbakemelding er anonym, og vi får derfor ikke besvart. Beskriv derfor så godt du kan. ' +
                'Tekniske feil meldes fremdeles fra i porten.',
            maxLength: 1000,
            placeholder: 'Skriv her...'
        }
    ]
} satisfies LumiSurveyConfig;

export const openLumiFeedbackModalAtom = atom<boolean>(false);

export const LumiFeedbackModal = () => {
    const [open, setOpen] = useAtom(openLumiFeedbackModalAtom);
    const [submitted, setSubmitted] = useState(false);

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

    return (
        <Modal
            className="w-[600px] max-w-[99%]"
            aria-labelledby="lumi-feedback-header"
            open={open}
            onClose={handleClose}
        >
            <Modal.Header>
                <Heading id="lumi-feedback-header" size="medium">
                    Din tilbakemelding er verdifull!
                </Heading>
            </Modal.Header>
            <Modal.Body>
                {submitted ? (
                    <VStack gap="space-4">
                        <BodyLong>Takk for tilbakemeldingen! 🎉</BodyLong>
                        <BodyLong>
                            Vi jobber kontinuerlig med å forbedre den nye utgaven av Modia personoversikt, så deres
                            innspill og tilbakemeldinger er verdifulle for oss!
                        </BodyLong>
                    </VStack>
                ) : (
                    <Box id="lumi-survey-container">
                        <VStack gap="space-8">
                            <LumiSurveyDock
                                surveyId="modiapersonoversikt-tilbakemelding"
                                survey={mySurvey}
                                success={{ autoClose: true, autoCloseDelayMs: 0 }}
                                transport={transport}
                                behavior={{ showPersonalDataNotice: false }}
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
                    <Button type="button" size="small" variant="primary" onClick={handleClose}>
                        Lukk
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};
