import * as React from 'react';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import { ViktigÅViteDAGInnhold } from './DAGInnhold';
import { ViktigÅViteAAPInnhold } from './AAPInnhold';
import { ViktigÅViteINDInnhold } from './INDInnhold';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { UnmountClosed } from 'react-collapse';

export type Props = StateProps;

export interface StateProps {
    valgtSakstema?: Sakstema;
    åpen: boolean;
}

const Luft = styled.div`
  margin-top: ${theme.margin.px10}
`;

const GråttPanel = styled.div`
    ${theme.gråttPanel};
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
                // return null;
                innhold = ViktigÅViteINDInnhold();
        }

        return (
            <UnmountClosed isOpened={this.props.åpen}>
                <GråttPanel>
                    {innhold}
                </GråttPanel>
            </UnmountClosed>
        );
    }
}

export default connect(
    (state: AppState): StateProps => {
        return {
            valgtSakstema: state.saksoversikt.valgtSakstema,
            åpen: state.saksoversikt.viktigÅViteÅpen
        };
    })(ViktigÅVite);
