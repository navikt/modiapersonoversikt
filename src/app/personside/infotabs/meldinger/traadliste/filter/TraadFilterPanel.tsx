import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import Input from 'nav-frontend-skjema/lib/input';

const InputStyle = styled.div`
    padding: ${theme.margin.layout};
`;

function TraadFilterPanel() {
    return (
        <InputStyle>
            <Input label={'Søk etter melding'} className={'move-input-label'} />
        </InputStyle>
    );
}

export default TraadFilterPanel;
