import * as React from 'react';
import { Person, PersonRespons } from '../../../../../models/person/person';
import Etiketter from './Etiketter';
import styled from 'styled-components';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

function EtiketterContainer() {
    return (
        <ErrorBoundary boundaryName="Etiketter">
            <Wrapper>
                <RestResourceConsumer<PersonRespons> getResource={restResources => restResources.personinformasjon}>
                    {person => <Etiketter person={person as Person} />}
                </RestResourceConsumer>
            </Wrapper>
        </ErrorBoundary>
    );
}

export default EtiketterContainer;
