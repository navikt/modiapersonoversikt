import * as React from 'react';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { Person } from '../PersondataDomain';
import Familie from './familie/Familie';
import Fullmakter from './fullmakt/Fullmakt';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import { Kolonne, VisittkortBodyWrapper } from './VisittkortStyles';
import DeltBosted from './deltBosted/DeltBosted';

interface Props {
    person: Person;
}

function SingleColumnLayout({ person }: { person: Person }) {
    return (
        <Kolonne>
            <Kontaktinformasjon person={person} />
            <Fullmakter fullmakter={person.fullmakt} />
            <Familie person={person} />
            <DeltBosted deltBosted={person.deltBosted} />
            {/* <Foreldreansvar foreldreansvar={person.foreldreansvar} />
            <NavKontorSeksjon />
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjonsListe={person.tilrettelagtKomunikasjonsListe} />
            <Vergemal vergemal={person.vergemal} />
            <Sikkerhetstiltak person={person} />
            <LenkeBrukerprofilContainer person={person} /> */}
        </Kolonne>
    );
}

function VisittkortBody({ person }: Props) {
    const visittKortBodyRef = React.createRef<HTMLDivElement>();

    // function getComponentWidth(): number {
    //     return visittKortBodyRef.current ? visittKortBodyRef.current.clientWidth : 0;
    // }

    // function getColumnLayout(antallKolonner: number) {
    //     switch (antallKolonner) {
    //         case 1:
    //             return SingleColumnLayout({ person });
    //         default:
    //             return null;
    //         // case 2:
    //         //     return DoubleColumnLayout(person);
    //         // default:
    //         //     return TripleColumnLayout(person);
    //     }
    // }

    // const componentWidth = getComponentWidth();
    // const maxColumnWidth = 275;
    // const numberOfColumns = Math.floor(componentWidth / maxColumnWidth);
    // const columnLayOut = getColumnLayout(numberOfColumns);

    return (
        <ErrorBoundary>
            <VisittkortBodyWrapper role="region" aria-label="Visittkortdetaljer" ref={visittKortBodyRef}>
                <VisuallyHiddenAutoFokusHeader tittel="Visittkortdetaljer" />
                <SingleColumnLayout person={person} />
            </VisittkortBodyWrapper>
        </ErrorBoundary>
    );
}

export default VisittkortBody;
