import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import Input from 'nav-frontend-skjema/lib/input';
import { LenkeKnapp } from '../../../../../components/common-styled-components';

interface Props {
    valgtTraad?: Traad;
}

const PanelStyle = styled.div`
    ${theme.hvittPanel};
    display: flex;
`;

const KnapperPanelStyle = styled.div`
    display: flex;
    > * {
        margin-right: ${theme.margin.layout};
    }
`;

const InputStyle = styled.div`
    flex-grow: 1;
    .move-input-label {
        display: flex;
        > * {
            margin-left: ${theme.margin.px10};
            margin-top: ${theme.margin.px10};
        }
    }
`;

function Funksjoner(props: Props) {
    if (!props.valgtTraad) {
        return null;
    }

    return (
        <KnapperPanelStyle>
            <LenkeKnapp>Journalfør</LenkeKnapp>
            <LenkeKnapp>Oppgave</LenkeKnapp>
            <LenkeKnapp>Merk</LenkeKnapp>
            <LenkeKnapp>Skriv ut</LenkeKnapp>
        </KnapperPanelStyle>
    );
}

function ToppMeny(props: Props) {
    return (
        <PanelStyle>
            <InputStyle>
                <Input label={'Søk'} className={'move-input-label'} bredde={'L'} />
            </InputStyle>
            <Funksjoner valgtTraad={props.valgtTraad} />
        </PanelStyle>
    );
}

export default ToppMeny;
