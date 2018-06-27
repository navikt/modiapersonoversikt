import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Person } from '../../../../models/person/person';
import { InfoGruppe, Kolonne, VisittkortBodyDiv } from './styledComponents';
import Familie from './familie/Familie';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import VergemalContainer from './vergemal/VergemalContainer';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import { paths } from '../../../routes/routing';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import NavKontorContainer from './navkontor/NavKontorContainer';

interface VisittkortBodyProps {
    person: Person;
}

function NavKontorSeksjon({person}: {person: Person}) {
    return (
        <InfoGruppe tittel={'NAV-kontor'}>
            <NavKontorContainer person={person}/>
        </InfoGruppe>
    );
}

function OneColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person}/>
                <Familie person={person}/>
                <NavKontorSeksjon person={person}/>
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe}/>
                <VergemalContainer/>
                <Sikkerhetstiltak person={person} />
            </Kolonne>
        </>
    );
}

function TwoColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person}/>
                <Familie person={person}/>
            </Kolonne>
            <Kolonne>
                <NavKontorSeksjon person={person}/>
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe}/>
                <VergemalContainer/>
                <Sikkerhetstiltak person={person} />
            </Kolonne>
        </>
    );
}

function ThreeColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person}/>
            </Kolonne>
            <Kolonne>
                <Familie person={person}/>
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe}/>
                <VergemalContainer/>
            </Kolonne>
            <Kolonne>
                <NavKontorSeksjon person={person}/>
                <Sikkerhetstiltak person={person} />
            </Kolonne>
        </>
    );
}

const LenkeEndreBrukerprofil = styled.div`
  display: flex;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

class VisittkortBody extends Component<VisittkortBodyProps> {

    private visittKortBodyRef: HTMLDivElement;

    constructor(props: VisittkortBodyProps) {
        super(props);
    }
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }
    handleResize() {
        this.forceUpdate();
    }
    getComponentWidth() {
        return this.visittKortBodyRef ? this.visittKortBodyRef.clientWidth : 0;
    }
    getColumnLayout(numberOfColumns: number) {
        switch (numberOfColumns) {
            case 0:
            case 1:
                return OneColumnLayout(this.props.person);
            case 2:
                return TwoColumnLayout(this.props.person);
            default:
                return ThreeColumnLayout(this.props.person);
        }
    }
    render() {
        const componentWidth = this.getComponentWidth();
        const maxColumnWidth = 250;
        const numberOfColumns = Math.floor(componentWidth / maxColumnWidth);
        const columnLayOut = this.getColumnLayout(numberOfColumns);

        return (
            <ErrorBoundary>
                <VisittkortBodyDiv innerRef={ref => this.visittKortBodyRef = ref}>
                    {columnLayOut}
                </VisittkortBodyDiv>
                <LenkeEndreBrukerprofil>
                    <Filler/>
                    <Link
                        className={'lenke'}
                        to={`${paths.brukerprofil}/${this.props.person.fødselsnummer}`}
                    >
                        Administrer brukerprofil
                    </Link>
                </LenkeEndreBrukerprofil>
            </ErrorBoundary>
        );
    }
}

export default VisittkortBody;
