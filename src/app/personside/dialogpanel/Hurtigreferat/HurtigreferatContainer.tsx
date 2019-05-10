import * as React from 'react';
import { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { tekster } from './tekster';
import HurtigreferatElement from './HurtigreferatElement';
import { FlexCenter } from '../../../../components/common-styled-components';
import NavFrontendSpinner from 'nav-frontend-spinner';

const Style = styled.div`
    ${theme.resetEkspanderbartPanelStyling};
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
`;

const MarginBottom = styled.div`
    margin-bottom: 6rem;
`;

function HurtigreferatContainer() {
    const [isPosting, setIsPosting] = useState(false);
    const handlePost = tekst => {
        setIsPosting(true);
    };
    if (isPosting) {
        return (
            <FlexCenter>
                <NavFrontendSpinner type="L" />
            </FlexCenter>
        );
    }
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>Hurtigreferat</Undertittel>} ariaTittel={'Hurtigreferat'}>
                <ul>
                    {tekster.map(tekst => (
                        <HurtigreferatElement key={tekst.tittel} tekst={tekst} send={() => handlePost(tekst)} />
                    ))}
                    <MarginBottom />
                </ul>
            </EkspanderbartpanelBase>
        </Style>
    );
}

export default HurtigreferatContainer;
