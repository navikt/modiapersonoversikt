import styled from 'styled-components';
import * as React from 'react';
import FillCenterAndFadeIn from './FillCenterAndFadeIn';
import LazySpinner from './LazySpinner';

const Margin = styled.div`
    margin: 0.5em;
`;

export const BigCenteredLazySpinner = (
    <FillCenterAndFadeIn>
        <Margin>
            <LazySpinner type={'XL'} />
        </Margin>
    </FillCenterAndFadeIn>
);
