import * as React from 'react';
import { Tekst } from './tekster';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { connect } from 'react-redux';
import HurtigreferatListe from './HurtigreferatListe';
import { Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';

interface DispatchProps {
    sendHurtigReferat: (tekst: Tekst) => void;
}

type Props = DispatchProps;

const Style = styled.div`
    .ekspanderbartPanel__innhold {
        padding: 0;
    }
    .ekspanderbartPanel__hode:hover {
        ${theme.hover}
    }
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
`;

function Hurtigreferat(props: Props) {
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>Hurtigreferat</Undertittel>} ariaTittel={'Hurtigreferat'}>
                <HurtigreferatListe send={props.sendHurtigReferat} />
            </EkspanderbartpanelBase>
        </Style>
    );
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        sendHurtigReferat: () => null
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Hurtigreferat);
