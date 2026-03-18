import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Heading, HStack, Modal, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { OnboardingStepper } from 'src/components/NyModia/OnboardingStepper';
import useOpenIntroduksjonsModal from 'src/components/NyModia/useHarSettNyModiaDialog';

export const OppstartNyModiaDialog = () => {
    const [open, toggleModal] = useOpenIntroduksjonsModal();
    const [activeStep, setActiveStep] = useState(1);

    const lukkModal = () => {
        toggleModal(false);
        setActiveStep(1);
    };

    return (
        <Modal width="90%" aria-labelledby="modal-header" open={open} onClose={lukkModal}>
            <Modal.Header closeButton={false}>
                <VStack>
                    <HStack className="justify-end">
                        <Button
                            size="xsmall"
                            title="Lukk modal"
                            variant="tertiary"
                            onClick={lukkModal}
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
                    size="small"
                    variant="primary"
                    onClick={() => {
                        if (activeStep < 3) {
                            setActiveStep(activeStep + 1);
                        } else {
                            lukkModal();
                        }
                    }}
                >
                    {activeStep > 2 ? 'Avslutt' : 'Neste'}
                </Button>
                {activeStep > 1 && (
                    <Button
                        size="small"
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
    );
};
