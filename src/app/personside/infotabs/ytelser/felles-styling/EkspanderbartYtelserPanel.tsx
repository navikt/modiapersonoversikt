import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { ytelserTest } from '../../dyplenkeTest/utils-dyplenker-test';

interface Props {
    children: ReactNode;
    tittel: string;
    tittelTillegsInfo?: (string | null)[];
    open: boolean;
    setOpen: (open: boolean) => void;
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

const CustomStyling = styled(Panel)`
    padding: 0rem;
    .ekspanderbartPanel__hode {
        position: sticky;
        top: 0;
        border-bottom: ${theme.border.skilleSvak};
        z-index: 10;
        background-color: white;
    }
`;

function EkspanderbartYtelserPanel(props: Props) {
    const tillegsinfo = props.tittelTillegsInfo
        ?.filter((info) => info) // filtrerer bort tomme entries
        .map((info, index) => <Normaltekst key={index}>{info}</Normaltekst>);

    const tittel = (
        <TittelStyle>
            <Undertittel tag="h2">{props.tittel}</Undertittel>
            {tillegsinfo}
        </TittelStyle>
    );

    return (
        <CustomStyling>
            <EkspanderbartpanelBase
                className={ytelserTest.ytelse}
                apen={props.open}
                /* TODO position:sticky på tittel */
                onClick={() => props.setOpen(!props.open)}
                tittel={tittel}
                aria-label={props.tittel}
            >
                {props.children}
            </EkspanderbartpanelBase>
        </CustomStyling>
    );
}

export default EkspanderbartYtelserPanel;
