import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { RestResource } from '../../../../../redux/restReducers/restResource';
import Etiketter from './Etiketter';
import styled from 'styled-components';
import PlukkRestData from '../../../infotabs/ytelser/pleiepenger/PlukkRestData';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface Props {
    personResource: RestResource<PersonRespons>;
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
                <PlukkRestData restResource={props.personResource}>
                    {data => <Etiketter person={data as Person} />}
                </PlukkRestData>
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
