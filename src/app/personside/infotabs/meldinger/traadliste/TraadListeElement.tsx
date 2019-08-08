import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Traad } from '../../../../../models/meldinger/meldinger';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import styled from 'styled-components';
import { meldingstypeTekst, temagruppeTekst } from '../utils/meldingstekster';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erMonolog, sisteSendteMelding } from '../utils/meldingerUtils';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { settValgtTraad } from '../../../../../redux/meldinger/actions';
import Meldingsikon from '../utils/Meldingsikon';

interface OwnProps {
    traad: Traad;
}

interface StateProps {
    erValgt: boolean;
}

interface DispatchProps {
    settValgtTraad: (traad: Traad) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const UUcustomOrder = styled.div`
    display: flex;
    flex-direction: column;
    .order-first {
        order: 0;
    }
    .order-second {
        order: 1;
    }
`;

const PanelStyle = styled.div`
    display: flex;
    > *:first-child {
        padding-right: ${theme.margin.layout};
    }
`;

function TraadListeElement(props: Props) {
    const nyesteMelding = sisteSendteMelding(props.traad);
    const datoTekst = formatterDatoTid(nyesteMelding.opprettetDato);
    const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(nyesteMelding.temagruppe)}`;

    return (
        <li>
            <VisMerKnapp
                valgt={props.erValgt}
                onClick={() => props.settValgtTraad(props.traad)}
                ariaDescription={'Vis meldinger for ' + tittel}
            >
                <PanelStyle>
                    <Meldingsikon
                        type={nyesteMelding.meldingstype}
                        erFerdigstiltUtenSvar={nyesteMelding.erFerdigstiltUtenSvar}
                        erMonolog={erMonolog(props.traad)}
                        antallMeldinger={props.traad.meldinger.length}
                    />
                    <div>
                        <UUcustomOrder>
                            <Element className="order-second">{tittel}</Element>
                            <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                        </UUcustomOrder>
                    </div>
                </PanelStyle>
            </VisMerKnapp>
        </li>
    );
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        erValgt: state.meldinger.valgtTraad === ownProps.traad
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        settValgtTraad: (traad: Traad) => dispatch(settValgtTraad(traad))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TraadListeElement);
