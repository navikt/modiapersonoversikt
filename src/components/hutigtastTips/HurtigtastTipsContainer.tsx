import * as React from 'react';
import { useEffect, useState } from 'react';
import { loggEvent } from '../../utils/frontendLogger';
import styled from 'styled-components';
import NavFrontendModal from 'nav-frontend-modal';
import HurtigtastHjelp from './HurtigtastHjelp';

const Modal = styled(NavFrontendModal)`
    &.modal {
        max-height: 70vh;
        min-width: 25rem;
    }
`;

function HurtigtastTipsContainer() {
    const [apen, settApen] = useState(false);

    useEffect(() => {
        const clickHandler = () => settApen(a => !a);
        const toggle = document.getElementById('hurtigtaster-button');
        if (toggle) {
            toggle.addEventListener('click', clickHandler);
            return () => toggle.removeEventListener('click', clickHandler);
        }
        return () => null;
    }, [settApen]);

    useEffect(() => {
        if (apen) {
            loggEvent('Visning', 'hurtigtaster Hjelp');
        }
    }, [apen]);

    return (
        <Modal contentLabel="Hurtigtast hjelp" isOpen={apen} onRequestClose={() => settApen(false)}>
            <HurtigtastHjelp />
        </Modal>
    );
}

export default HurtigtastTipsContainer;
