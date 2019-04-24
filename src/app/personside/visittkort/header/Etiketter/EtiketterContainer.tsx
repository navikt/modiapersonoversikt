import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { DeprecatedRestResource, Loaded } from '../../../../../redux/restReducers/deprecatedRestResource';
import Etiketter from './Etiketter';
import styled from 'styled-components';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import Innholdslaster from '../../../../../components/Innholdslaster';

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
                <Innholdslaster avhengigheter={[props.personResource]}>
                    <Etiketter person={(props.personResource as Loaded<Person>).data} />
                </Innholdslaster>
            </Wrapper>
        </ErrorBoundary>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        personResource: state.restResources.personinformasjon
    };
};

export default connect(mapStateToProps)(EtiketterContainer);
