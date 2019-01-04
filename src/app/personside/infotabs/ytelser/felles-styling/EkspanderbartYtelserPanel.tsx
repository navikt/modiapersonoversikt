import * as React from 'react';
import { ReactNode } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import styled from 'styled-components';
import { Bold } from '../../../../../components/common-styled-components';
import { Normaltekst } from 'nav-frontend-typografi';

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

function EkspanderbartYtelserPanel(props: Props) {

    const tillegsinfo = props.tittelTillegsInfo && props.tittelTillegsInfo
        .filter(info => info) // filtrerer bort tomme entries
        .map(((info, index) => <Normaltekst key={index}>{info}</Normaltekst>));

    const tittel = (
        <TittelStyle>
            <Normaltekst><Bold>{props.tittel}</Bold></Normaltekst>
            {tillegsinfo}
        </TittelStyle>
    );

    return (
        <EkspanderbartpanelBase heading={tittel} ariaTittel={props.tittel}>
            {props.children}
        </EkspanderbartpanelBase>
    );
}

export default EkspanderbartYtelserPanel;
