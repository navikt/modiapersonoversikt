import * as React from 'react';
import { Component } from 'react';
import { Person } from '../../../../models/person/person';
import NavKontorContainer from './navkontor/NavKontorContainer';
import { InfoGruppe, Kolonne, VisittkortBodyDiv } from './styledComponents';
import Familie from './familie/Familie';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import VergemalContainer from './vergemal/VergemalContainer';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import { paths } from '../../../routes/routing';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface VisittkortBodyProps {
    person: Person;
}

const NavKontor = (
    <InfoGruppe tittel={'NAV-kontor'}>
        <NavKontorContainer/>
    </InfoGruppe>
);

function OneColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person}/>
                <Familie person={person}/>
                {NavKontor}
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
                {NavKontor}
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
                {NavKontor}
                <Sikkerhetstiltak person={person} />
            </Kolonne>
        </>
    );
}

const RedigerBrukerprofilWrapper = styled.div`
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
            <>
                <VisittkortBodyDiv innerRef={ref => this.visittKortBodyRef = ref}>
                    {columnLayOut}
                </VisittkortBodyDiv>
                <RedigerBrukerprofilWrapper>
                    <Filler/>
                    <Link
                        className={'lenke'}
                        to={`${paths.brukerprofil}/${this.props.person.fødselsnummer}`}
                    >
                        Rediger Brukerprofil
                    </Link>
                </RedigerBrukerprofilWrapper>
            </>
        );
    }
}

export default VisittkortBody;
