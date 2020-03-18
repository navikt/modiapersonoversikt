import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { loggEvent } from '../../utils/logger/frontendLogger';
import styled from 'styled-components';
import NavFrontendModal from 'nav-frontend-modal';
import HurtigtastHjelp from './HurtigtastHjelp';
import useListener from '../../utils/hooks/use-listener';

const Modal = styled(NavFrontendModal)`
    &.modal {
        max-height: 70vh;
        min-width: 25rem;
    }
`;

function HurtigtastTipsContainer() {
    const [apen, settApen] = useState(false);

    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#hurtigtaster-button', 'click', listener, document.querySelector('dekorator'));

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
