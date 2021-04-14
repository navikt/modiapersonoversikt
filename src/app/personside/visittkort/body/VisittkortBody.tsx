import * as React from 'react';
import { Person } from '../../../../models/person/person';
import { Kolonne, VisittkortBodyWrapper, VisittkortGruppe } from './VisittkortStyles';
import Familie from './familie/Familie';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import NavKontorContainer from './navkontor/NavKontorContainer';
import LenkeBrukerprofilContainer from './lenkebrukerprofil/LenkeBrukerprofilContainer';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import Fullmakter from './fullmakt/Fullmakt';
import Vergemal from './vergemal/Vergemal';
import Foreldreansvar from './foreldreansvar/Foreldreansvar';
import DeltBosted from './deltBosted/DeltBosted';

interface VisittkortBodyProps {
    person: Person;
}

function NavKontorSeksjon() {
    return (
        <VisittkortGruppe tittel={'NAV-kontor'}>
            <NavKontorContainer />
        </VisittkortGruppe>
    );
}

function OneColumnLayout(person: Person) {
    return (
        <Kolonne>
            <Kontaktinformasjon person={person} />
            <Fullmakter fullmakter={person.fullmakt} />
            <Familie person={person} />
            <DeltBosted deltbosted={person.deltBosted} />
            <Foreldreansvar foreldreansvar={person.foreldreansvar} />
            <NavKontorSeksjon />
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
            <Vergemal vergemal={person.vergemal} />
            <Sikkerhetstiltak person={person} />
            <LenkeBrukerprofilContainer person={person} />
        </Kolonne>
    );
}

function TwoColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person} />
                <Fullmakter fullmakter={person.fullmakt} />
                <Familie person={person} />
                <Foreldreansvar foreldreansvar={person.foreldreansvar} />
                <DeltBosted deltbosted={person.deltBosted} />
            </Kolonne>
            <Kolonne>
                <NavKontorSeksjon />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
                <Vergemal vergemal={person.vergemal} />
                <Sikkerhetstiltak person={person} />
                <LenkeBrukerprofilContainer person={person} />
            </Kolonne>
        </>
    );
}

function ThreeColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person} />
                <Fullmakter fullmakter={person.fullmakt} />
            </Kolonne>
            <Kolonne>
                <Familie person={person} />
                <Foreldreansvar foreldreansvar={person.foreldreansvar} />
                <DeltBosted deltbosted={person.deltBosted} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
                <Vergemal vergemal={person.vergemal} />
            </Kolonne>
            <Kolonne>
                <NavKontorSeksjon />
                <Sikkerhetstiltak person={person} />
                <LenkeBrukerprofilContainer person={person} />
            </Kolonne>
        </>
    );
}

class VisittkortBody extends React.PureComponent<VisittkortBodyProps> {
    private visittKortBodyRef = React.createRef<HTMLDivElement>();

    constructor(props: VisittkortBodyProps) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
    }
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize() {
        this.forceUpdate();
    }
    getComponentWidth() {
        return this.visittKortBodyRef.current ? this.visittKortBodyRef.current.clientWidth : 0;
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
                <VisittkortBodyWrapper role="region" aria-label="Visittkortdetaljer" ref={this.visittKortBodyRef}>
                    <VisuallyHiddenAutoFokusHeader tittel="Visittkortdetaljer" />
                    {columnLayOut}
                </VisittkortBodyWrapper>
            </ErrorBoundary>
        );
    }
}

export default VisittkortBody;
