import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Heading, HStack, Modal, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { OnboardingStepper } from 'src/components/NyModia/OnboardingStepper';
import useHarSettNyModiaDialog from 'src/components/NyModia/useHarSettNyModiaDialog';

export const OppstartNyModiaDialog = () => {
    const [harSett, markerSomSett] = useHarSettNyModiaDialog();
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(1);

    const openEllerIkkeSett = open || !harSett;

    const lukk = () => {
        setOpen(false);
        markerSomSett();
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Åpne modal</Button>
            <Modal width="1000px" aria-labelledby="modal-header" open={openEllerIkkeSett} onClose={lukk}>
                <Modal.Header closeButton={false}>
                    <VStack>
                        <HStack className="justify-end">
                            <Button
                                size="xsmall"
                                title="Lukk modal"
                                variant="tertiary"
                                onClick={lukk}
                                icon={<XMarkIcon aria-hidden />}
                            ></Button>
                        </HStack>
                        <Heading id="modal-header" size="medium" align="center">
                            Se hva som er nytt i Modia personoversikt <span aria-hidden>✨</span>
                        </Heading>
                    </VStack>
                </Modal.Header>
                <Modal.Body>
                    <OnboardingStepper activeStep={activeStep} setActiveStep={setActiveStep} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        size="medium"
                        variant="primary"
                        onClick={() => {
                            if (activeStep < 3) {
                                setActiveStep(activeStep + 1);
                            } else {
                                lukk();
                            }
                        }}
                    >
                        {activeStep > 2 ? 'Avslutt' : 'Neste'}
                    </Button>
                    {activeStep > 1 && (
                        <Button
                            size="medium"
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setActiveStep(activeStep - 1);
                            }}
                        >
                            Tilbake
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};
