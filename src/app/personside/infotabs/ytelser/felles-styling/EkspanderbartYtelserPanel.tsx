import * as React from 'react';
import { ReactNode, useState } from 'react';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';
import styled from 'styled-components';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import { ytelserTest } from '../../dyplenkeTest/utils';

interface Props {
    children: ReactNode;
    tittel: string;
    tittelTillegsInfo?: (string | null)[];
    defaultApen?: boolean;
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

function EkspanderbartYtelserPanel(props: Props) {
    const [apen, setApen] = useState(props.defaultApen);

    const tillegsinfo =
        props.tittelTillegsInfo &&
        props.tittelTillegsInfo
            .filter(info => info) // filtrerer bort tomme entries
            .map((info, index) => <Normaltekst key={index}>{info}</Normaltekst>);

    const tittel = (
        <TittelStyle>
            <Undertittel tag="h2">{props.tittel}</Undertittel>
            {tillegsinfo}
        </TittelStyle>
    );

    return (
        <CustomStyling className={ytelserTest.ytelse}>
            <EkspanderbartpanelBasePure
                apen={apen}
                onClick={() => setApen(!apen)}
                heading={tittel}
                ariaTittel={props.tittel}
            >
                {props.children}
            </EkspanderbartpanelBasePure>
        </CustomStyling>
    );
}

export default EkspanderbartYtelserPanel;
