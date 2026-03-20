import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, HStack, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import { OnboardingStepper } from 'src/components/NyModia/OnboardingStepper';
import useOpenIntroduksjonsModal from 'src/components/NyModia/useHarSettNyModiaDialog';
import { twMerge } from 'tailwind-merge';

export const OppstartNyModiaDialog = () => {
    const [open, toggleModal] = useOpenIntroduksjonsModal();
    const [activeStep, setActiveStep] = useState(1);

    const lukkModal = () => {
        toggleModal(false);
        setActiveStep(1);
    };

    return (
        <Modal
            className={twMerge(open && 'w-[1000px] max-w-[99%]')}
            aria-labelledby="modal-header"
            open={open}
            onClose={lukkModal}
        >
            <Modal.Header closeButton={false}>
                <HStack justify="space-between">
                    <Box.New className="flex-0" />
                    <Heading id="modal-header" size="medium" align="center" className="ml-8">
                        Se hva som er nytt i Modia personoversikt <span aria-hidden>✨</span>
                    </Heading>
                    <Button
                        size="xsmall"
                        title="Lukk modal"
                        variant="tertiary"
                        onClick={lukkModal}
                        icon={<XMarkIcon aria-hidden />}
                    ></Button>
                </HStack>
            </Modal.Header>
            <Modal.Body className={twMerge('h-[500px]')}>
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
