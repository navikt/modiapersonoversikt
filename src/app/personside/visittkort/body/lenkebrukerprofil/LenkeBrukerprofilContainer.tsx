import * as React from 'react';
import LenkeBrukerprofilVisning from './LenkeBrukerprofil';
import { Person } from '../../../../../models/person/person';
import styled from 'styled-components/macro';

interface OwnProps {
    person: Person;
}

type Props = OwnProps;

const PlaceBottomRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 1;
`;

class LenkeBrukerprofilContainer extends React.Component<Props> {
    render() {
        return (
            <PlaceBottomRight>
                <LenkeBrukerprofilVisning />
            </PlaceBottomRight>
        );
    }
}

export default LenkeBrukerprofilContainer;
