import * as React from 'react';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { Person } from '../PersondataDomain';
import Familie from './familie/Familie';
import Fullmakter from './fullmakt/Fullmakt';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import { Kolonne, VisittkortBodyWrapper } from './VisittkortStyles';
import DeltBosted from './deltBosted/DeltBosted';
import Foreldreansvar from './foreldreansvar/Foreldreansvar';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Vergemal from './vergemal/Vergemal';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import LenkeBrukerprofil from './lenkebrukerprofil/LenkeBrukerprofil';
import { useEffect, useState } from 'react';

interface Props {
    person: Person;
}

function SingleColumnLayout(person: Person) {
    return (
        <Kolonne>
            <Kontaktinformasjon person={person} />
            <Fullmakter fullmakter={person.fullmakt} />
            <Familie person={person} />
            <DeltBosted deltBosted={person.deltBosted} />
            <Foreldreansvar foreldreansvar={person.foreldreansvar} />
            {/*<NavKontorSeksjon />*/}
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={person.tilrettelagtKommunikasjon} />
            <Vergemal vergemal={person.vergemal} />
            <Sikkerhetstiltak sikkerhetstiltak={person.sikkerhetstiltak} />
            <LenkeBrukerprofil />
        </Kolonne>
    );
}

function DoubleColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person} />
                <Fullmakter fullmakter={person.fullmakt} />
                <Familie person={person} />
                <DeltBosted deltBosted={person.deltBosted} />
                <Foreldreansvar foreldreansvar={person.foreldreansvar} />
            </Kolonne>
            <Kolonne>
                {/* {<NavKontorSeksjon />} */}
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={person.tilrettelagtKommunikasjon} />
                <Vergemal vergemal={person.vergemal} />
                <Sikkerhetstiltak sikkerhetstiltak={person.sikkerhetstiltak} />
                <LenkeBrukerprofil />
            </Kolonne>
        </>
    );
}

function TripleColumnLayout(person: Person) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon person={person} />
                <Fullmakter fullmakter={person.fullmakt} />
            </Kolonne>
            <Kolonne>
                <Familie person={person} />
                <Foreldreansvar foreldreansvar={person.foreldreansvar} />
                <DeltBosted deltBosted={person.deltBosted} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={person.tilrettelagtKommunikasjon} />
                <Vergemal vergemal={person.vergemal} />
            </Kolonne>
            <Kolonne>
                {/* <NavKontorSeksjon /> */}
                <Sikkerhetstiltak sikkerhetstiltak={person.sikkerhetstiltak} />
                <LenkeBrukerprofil />
            </Kolonne>
        </>
    );
}

function VisittkortBody({ person }: Props) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        function updateWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    function getColumnLayout(antallKolonner: number) {
        if (antallKolonner <= 1) {
            return SingleColumnLayout(person);
        } else if (antallKolonner === 2) {
            return DoubleColumnLayout(person);
        }
        return TripleColumnLayout(person);
    }

    const maxColumnWidth = 275;
    const numberOfColumns = Math.floor(width / maxColumnWidth);
    const columnLayOut = getColumnLayout(numberOfColumns);

    return (
        <ErrorBoundary>
            <VisittkortBodyWrapper role="region" aria-label="Visittkortdetaljer">
                <VisuallyHiddenAutoFokusHeader tittel="Visittkortdetaljer" />
                {columnLayOut}
            </VisittkortBodyWrapper>
        </ErrorBoundary>
    );
}

export default VisittkortBody;
