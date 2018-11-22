import * as React from 'react';
import { AppState } from '../../../../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { ViktigÅViteTema } from '../../../../../redux/viktigAVite/types';
import { ViktigÅViteDAGInnhold } from './DAGInnhold';
import { ViktigÅViteAAPInnhold } from './AAPInnhold';
import { assertUnreachable } from '../../../../../utils/assertUnreachable';
import { ViktigÅViteINDInnhold } from './INDInnhold';
import { AnyAction } from 'redux';
import { setViktigÅViteÅpen } from '../../../../../redux/viktigAVite/actions';
import DetaljerCollapse from '../../utbetalinger/DetaljerCollapse';

export type Props = StateProps & DispatchProps;

export interface StateProps {
    åpentTema?: ViktigÅViteTema;
    åpen: boolean;
}

interface DispatchProps {
    setÅpen: (åpen: boolean) => void;
}

class ViktigÅVite extends React.PureComponent<Props> {
    render() {
        if (!this.props.åpentTema) {
            return null;
        }
        let innhold;
        const temanavn = this.props.åpentTema.temanavn;
        switch (this.props.åpentTema.temakode) {
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
                return assertUnreachable();
        }

        return (
            <DetaljerCollapse
                open={this.props.åpen}
                toggle={() => this.props.setÅpen(!this.props.åpen)}
                tittel={'viktig å vite om ' + temanavn}
            >
                {innhold}
            </DetaljerCollapse>
        );
    }
}

export default connect(
    (state: AppState): StateProps => {
        return {
            åpentTema: state.viktigÅVite.åpentTema,
            åpen: state.viktigÅVite.åpen
        };
    },
    (dispatch: Dispatch<AnyAction>): DispatchProps => {
        return {
            setÅpen: (åpen: boolean) => dispatch(setViktigÅViteÅpen(åpen))
        };
    })(ViktigÅVite);
