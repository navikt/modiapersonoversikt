import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { DeprecatedRestResource } from '../../../../../redux/restReducers/deprecatedRestResource';
import Etiketter from './Etiketter';
import styled from 'styled-components';
import PlukkRestDataDeprecated from '../../../infotabs/ytelser/pleiepenger/PlukkRestDataDeprecated';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface Props {
    personResource: DeprecatedRestResource<PersonRespons>;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

function EtiketterContainer(props: Props) {
    return (
        <ErrorBoundary boundaryName="Etiketter">
            <Wrapper>
                <PlukkRestDataDeprecated restResource={props.personResource}>
                    {data => <Etiketter person={data as Person} />}
                </PlukkRestDataDeprecated>
            </Wrapper>
        </ErrorBoundary>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        personResource: state.restResources.personinformasjon
    };
};

export default connect(
    mapStateToProps,
    null
)(EtiketterContainer);
