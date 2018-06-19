import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { KodeverkResponse } from '../../../models/kodeverk';
import { connect } from 'react-redux';
import { AppState, RestReducer } from '../../../redux/reducer';

export interface PoststedInformasjon {
    postnummer: string;
    poststed: string;
}

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

interface OwnProps {
    poststedInformasjon: PoststedInformasjon;
    onChange: (poststedInformasjon: PoststedInformasjon) => void;
}

type Props = StateProps & OwnProps;

class Poststed extends React.Component<Props> {

    onPostnummerInput(input: string) {
        const {kodeverk} = this.props.postnummerReducer.data;
        const postnummer = input.trim();
        if (postnummer.length === 4) {
            const poststed = kodeverk.find(({kodeRef}) => kodeRef === postnummer);
            if (poststed) {
                this.props.onChange({...this.props.poststedInformasjon, poststed: poststed.beskrivelse});
            }
        }
    }

    render() {
        const {poststedInformasjon} = this.props;

        return (
            <InputLinje>
                <Input
                    bredde={'S'}
                    label="Postnummer"
                    defaultValue={poststedInformasjon.postnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        this.props.onChange({...poststedInformasjon, postnummer: event.target.value});
                        this.onPostnummerInput(event.target.value);
                    }
                    }
                />
                <PoststedInput>
                    <Input
                        bredde={'XXL'}
                        label="Poststed"
                        disabled={true}
                        value={poststedInformasjon.poststed}
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