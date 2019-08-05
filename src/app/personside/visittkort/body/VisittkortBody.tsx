import * as React from 'react';
import { Person } from '../../../../models/person/person';
import { Kolonne, VisittkortBodyWrapper, VisittkortGruppe } from './VisittkortStyles';
import Familie from './familie/Familie';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import VergemalContainer from './vergemal/VergemalContainer';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import NavKontorContainer from './navkontor/NavKontorContainer';
import LenkeBrukerprofilContainer from './lenkebrukerprofil/LenkeBrukerprofilContainer';
import { loggEvent } from '../../../../utils/frontendLogger';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';

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
            <Familie person={person} />
            <NavKontorSeksjon />
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
            <VergemalContainer />
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
                <Familie person={person} />
            </Kolonne>
            <Kolonne>
                <NavKontorSeksjon />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
                <VergemalContainer />
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
            </Kolonne>
            <Kolonne>
                <Familie person={person} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
                <VergemalContainer />
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
        loggEvent('Åpne', 'Visittkort');
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
