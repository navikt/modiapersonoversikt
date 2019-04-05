import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { KodeverkResponse } from '../../../../models/kodeverk';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Loaded } from '../../../../redux/restReducers/deprecatedRestResource';

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
    postnummerResource: Loaded<KodeverkResponse>;
}

interface OwnProps {
    poststedInformasjon: PoststedInformasjon;
    feil?: SkjemaelementFeil;
    onChange: (poststedInformasjon: PoststedInformasjon) => void;
}

type Props = StateProps & OwnProps;

class Poststed extends React.Component<Props> {
    onPostnummerInput(input: string) {
        this.props.onChange({ ...this.props.poststedInformasjon, postnummer: input });
        const { kodeverk } = this.props.postnummerResource.data;
        const postnummer = input.trim();
        if (postnummer.length === 4) {
            const poststed = kodeverk.find(({ kodeRef }) => kodeRef === postnummer);
            if (poststed) {
                this.props.onChange({ postnummer, poststed: poststed.beskrivelse });
            }
        }
    }

    render() {
        const { poststedInformasjon, feil } = this.props;

        return (
            <InputLinje>
                <Input
                    bredde={'S'}
                    label="Postnummer"
                    value={poststedInformasjon.postnummer || ''}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        this.props.onChange({ ...poststedInformasjon, postnummer: event.target.value });
                        this.onPostnummerInput(event.target.value);
                    }}
                    feil={feil}
                />
                <PoststedInput>
                    <Input bredde={'XXL'} label="Poststed" disabled={true} value={poststedInformasjon.poststed} />
                </PoststedInput>
            </InputLinje>
        );
    }
}

function mapStateToProps(appState: AppState) {
    return {
        postnummerResource: appState.restResources.postnummer as Loaded<KodeverkResponse>
    };
}

export default connect(mapStateToProps)(Poststed);
