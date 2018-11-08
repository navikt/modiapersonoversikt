import * as React from 'react';
import LenkeBrukerprofilVisning from './LenkeBrukerprofil';
import { Person } from '../../../../../models/person/person';
import styled from 'styled-components';

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

function urlTilhørerNyModia(url: string): boolean {
    return url.includes('modiapersonoversikt');
}

class LenkeBrukerprofilContainer extends React.Component<Props> {
    render() {
        return (
            <PlaceBottomRight>
                <LenkeBrukerprofilVisning
                    nyModiaPersonoversikt={urlTilhørerNyModia(window.location.href)}
                    person={this.props.person}
                />
            </PlaceBottomRight>
        );
    }
}

export default LenkeBrukerprofilContainer;
