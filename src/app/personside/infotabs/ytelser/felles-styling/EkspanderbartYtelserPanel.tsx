import * as React from 'react';
import { ReactNode } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import styled from 'styled-components/macro';
import { Bold } from '../../../../../components/common-styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    children: ReactNode;
    tittel: string;
    tittelTillegsInfo?: (string | null)[];
}

const TittelStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    > *:first-child {
        flex-basis: 10em;
        flex-shrink: 0;
    }
    > * {
        white-space: nowrap;
    }
    > *:not(:last-child) {
        margin-right: 2rem;
    }
`;

const CustomStyling = styled.div`
    ${theme.hvittPanel};
`;

const FjernPadding = styled.div`
    .ekspanderbartPanel__innhold {
        padding: 0;
    }
    .ekspanderbartPanel__hode:hover {
        ${theme.hover}
    }
`;

function EkspanderbartYtelserPanel(props: Props) {
    const tillegsinfo =
        props.tittelTillegsInfo &&
        props.tittelTillegsInfo
            .filter(info => info) // filtrerer bort tomme entries
            .map((info, index) => <Normaltekst key={index}>{info}</Normaltekst>);

    const tittel = (
        <TittelStyle>
            <Normaltekst>
                <Bold>{props.tittel}</Bold>
            </Normaltekst>
            {tillegsinfo}
        </TittelStyle>
    );

    return (
        <FjernPadding>
            <CustomStyling>
                <EkspanderbartpanelBase heading={tittel} ariaTittel={props.tittel}>
                    {props.children}
                </EkspanderbartpanelBase>
            </CustomStyling>
        </FjernPadding>
    );
}

export default EkspanderbartYtelserPanel;
