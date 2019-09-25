import * as React from 'react';
import PersonsokSkjema from './PersonsokSkjema';
import PersonsokResultat from './PersonsokResultat';
import { useState } from 'react';
import { useEffect } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        background-color: ${theme.color.navLysGra};
    }
`;
function PersonsokContainer() {
    const [apen, settApen] = useState(false);
    useEffect(() => {
        const clickHandler = () => {
            settApen(a => {
                return !a;
            });
        };
        const toggle = document.getElementById('toggle-personsok');
        if (toggle) {
            toggle.addEventListener('click', clickHandler);
        }
        return () => {
            if (toggle) {
                toggle.removeEventListener('click', clickHandler);
            }
        };
    }, [settApen]);

    return (
        <StyledModalWrapper contentLabel={'Avansert søk'} onRequestClose={() => settApen(false)} isOpen={apen}>
            <PersonsokSkjema />
            <PersonsokResultat onClose={() => settApen(false)} />
        </StyledModalWrapper>
    );
}

export default PersonsokContainer;
