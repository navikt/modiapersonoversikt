import * as React from 'react';
import { AppState } from '../../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { ViktigÅViteDAGInnhold } from './DAGInnhold';
import { ViktigÅViteAAPInnhold } from './AAPInnhold';
import { ViktigÅViteINDInnhold } from './INDInnhold';
import { AnyAction } from 'redux';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { setViktigÅViteÅpen } from '../../../../../redux/saksoversikt/actions';

export type Props = StateProps & DispatchProps;

export interface StateProps {
    valgtSakstema?: Sakstema;
    åpen: boolean;
}

interface DispatchProps {
    setÅpen: (åpen: boolean) => void;
}

const Luft = styled.div`
  margin-top: ${theme.margin.px10}
`;

class ViktigÅVite extends React.PureComponent<Props> {
    render() {
        if (!this.props.valgtSakstema) {
            return <Luft/>;
        }

        let innhold;
        switch (this.props.valgtSakstema.temakode) {
            case 'AAP':
                innhold = ViktigÅViteAAPInnhold();
                break;
            case 'DAG':
                innhold = ViktigÅViteDAGInnhold();
                break;
            case 'IND':
                innhold = ViktigÅViteINDInnhold();
                break;
            default:
                return <Luft/>;
        }

        return (
            <DetaljerCollapse
                open={this.props.åpen}
                toggle={() => this.props.setÅpen(!this.props.åpen)}
                tittel={'viktig å vite om ' + this.props.valgtSakstema.temanavn}
                knappPaTopp={true}
            >
                {innhold}
            </DetaljerCollapse>
        );
    }
}

export default connect(
    (state: AppState): StateProps => {
        return {
            valgtSakstema: state.saksoversikt.valgtSakstema,
            åpen: state.saksoversikt.viktigÅViteÅpen
        };
    },
    (dispatch: Dispatch<AnyAction>): DispatchProps => {
        return {
            setÅpen: (åpen: boolean) => dispatch(setViktigÅViteÅpen(åpen))
        };
    })(ViktigÅVite);
