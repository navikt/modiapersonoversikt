import * as React from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { Kodeverk, KodeverkResponse } from '../../../models/kodeverk';
import { connect } from 'react-redux';
import { AppState, RestReducer } from '../../../redux/reducer';
import { Skjemainput } from './InputFelt';

const InputLinje = styled.div`
  display: flex;
`;

const PoststedInput = styled.div`
  flex: 4;
  margin-left: 15px;
`;

interface StateProps {
    postnummerReducer: RestReducer<KodeverkResponse>;
}

interface State {
    poststed: string;
}

interface OwnProps {
    postnummer: Skjemainput;
    onChange: (postnummer: Skjemainput) => void;
}

type Props = StateProps & OwnProps;

function getPoststed(kodeverk: Kodeverk[], postnummer: string) {
    if (postnummer.length !== 4) {
        return undefined;
    }
    return kodeverk.find(({kodeRef}) => kodeRef === postnummer);
}

class Poststed extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const poststed = getPoststed(props.postnummerReducer.data.kodeverk, props.postnummer.value);
        this.state = {
            poststed: poststed ? poststed.beskrivelse : ''
        };
    }

    onPostnummerInput(input: string) {
        const {kodeverk} = this.props.postnummerReducer.data;

        const poststed = getPoststed(kodeverk, input);
        if (poststed) {
            this.setState({poststed: poststed.beskrivelse});
        }
    }

    render() {
        const {postnummer} = this.props;

        return (
            <InputLinje>
                <Skjemainput
                    bredde={'S'}
                    label="Postnummer"
                    skjemainput={postnummer}
                    onSkjemainput={(skjemainput) => {
                        this.props.onChange(skjemainput);
                        this.onPostnummerInput(skjemainput.value);
                    }}
                />
                <PoststedInput>
                    <Input
                        bredde={'XXL'}
                        label="Poststed"
                        disabled={true}
                        value={this.state.poststed}
                    />
                </PoststedInput>
            </InputLinje>
        );
    }
}

function mapStateToProps(appState: AppState) {
    return {
        postnummerReducer: appState.postnummerReducer
    };
}

export default connect(mapStateToProps)(Poststed);