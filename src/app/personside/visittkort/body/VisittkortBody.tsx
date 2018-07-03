import * as React from 'react';
import { Component } from 'react';

import { Person } from '../../../../models/person/person';
import { Kolonne, VisittkortBodyDiv, VisittkortGruppe } from './VisittkortStyles';
import Familie from './familie/Familie';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import VergemalContainer from './vergemal/VergemalContainer';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import NavKontorContainer from './navkontor/NavKontorContainer';
import LenkeBrukerprofilContainer from './lenkebrukerprofil/LenkeBrukerprofilContainer';

interface VisittkortBodyProps {
    person: Person;
}

function NavKontorSeksjon({ person }: { person: Person }) {
    return (
        <VisittkortGruppe tittel={'NAV-kontor'}>
            <NavKontorContainer person={person}/>
        </VisittkortGruppe>
    );
}

function OneColumnLayout(person: Person) {
    return (
        <Kolonne>
            <Kontaktinformasjon person={person}/>
            <Familie person={person}/>
            <NavKontorSeksjon person={person}/>
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe}/>
            <VergemalContainer/>
            <Sikkerhetstiltak person={person}/>
            <LenkeBrukerprofilContainer person={person}/>
        </Kolonne>
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
                <Sikkerhetstiltak person={person}/>
                <LenkeBrukerprofilContainer person={person}/>
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
                <Sikkerhetstiltak person={person}/>
                <LenkeBrukerprofilContainer person={person}/>
            </Kolonne>
        </>
    );
}

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
        const maxColumnWidth = 275;
        const numberOfColumns = Math.floor(componentWidth / maxColumnWidth);
        const columnLayOut = this.getColumnLayout(numberOfColumns);

        return (
            <ErrorBoundary>
                <VisittkortBodyDiv innerRef={ref => this.visittKortBodyRef = ref}>
                    {columnLayOut}
                </VisittkortBodyDiv>
            </ErrorBoundary>
        );
    }
}

export default VisittkortBody;
