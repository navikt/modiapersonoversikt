import { useEffect, useState } from 'react';
import DodsdatoInfo from 'src/app/personside/visittkort-v2/body/DodsdatoInfo';
import FlyttingInfo from 'src/app/personside/visittkort-v2/body/FlyttingInfo';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import type { Data as PersonData } from '../PersondataDomain';
import { Kolonne, VisittkortBodyWrapper } from './VisittkortStyles';
import DeltBosted from './deltBosted/DeltBosted';
import Familie from './familie/Familie';
import Foreldreansvar from './foreldreansvar/Foreldreansvar';
import Fullmakter from './fullmakt/Fullmakt';
import Kontaktinformasjon from './kontaktinformasjon/Kontaktinformasjon';
import LenkeBrukerprofil from './lenkebrukerprofil/LenkeBrukerprofil';
import NavKontor from './navkontor/NavKontor';
import Sikkerhetstiltak from './sikkerhetstiltak/Sikkerhetstiltak';
import TilrettelagtKommunikasjon from './tilrettelagtkommunikasjon/TilrettelagtKommunikasjon';
import Vergemal from './vergemal/Vergemal';

interface Props {
    persondata: PersonData;
}

function SingleColumnLayout(persondata: PersonData) {
    return (
        <Kolonne>
            <DodsdatoInfo person={persondata.person} />
            <Kontaktinformasjon persondata={persondata} />
            <Fullmakter feilendeSystemer={persondata.feilendeSystemer} fullmakter={persondata.person.fullmakt} />
            <Familie feilendeSystemer={persondata.feilendeSystemer} person={persondata.person} />
            <DeltBosted deltBosted={persondata.person.deltBosted} />
            <Foreldreansvar
                feilendeSystemer={persondata.feilendeSystemer}
                foreldreansvar={persondata.person.foreldreansvar}
            />
            <NavKontor
                feilendeSystemer={persondata.feilendeSystemer}
                navEnhet={persondata.person.navEnhet}
                geografiskTilknytning={persondata.person.geografiskTilknytning}
            />
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={persondata.person.tilrettelagtKommunikasjon} />
            <Vergemal feilendeSystemer={persondata.feilendeSystemer} vergemal={persondata.person.vergemal} />
            <Sikkerhetstiltak sikkerhetstiltak={persondata.person.sikkerhetstiltak} />
            <FlyttingInfo person={persondata.person} />
            <LenkeBrukerprofil />
        </Kolonne>
    );
}

function DoubleColumnLayout(persondata: PersonData) {
    return (
        <>
            <Kolonne>
                <DodsdatoInfo person={persondata.person} />
                <Kontaktinformasjon persondata={persondata} />
                <Fullmakter feilendeSystemer={persondata.feilendeSystemer} fullmakter={persondata.person.fullmakt} />
                <Familie feilendeSystemer={persondata.feilendeSystemer} person={persondata.person} />
                <DeltBosted deltBosted={persondata.person.deltBosted} />
                <Foreldreansvar
                    feilendeSystemer={persondata.feilendeSystemer}
                    foreldreansvar={persondata.person.foreldreansvar}
                />
            </Kolonne>
            <Kolonne>
                <NavKontor
                    feilendeSystemer={persondata.feilendeSystemer}
                    navEnhet={persondata.person.navEnhet}
                    geografiskTilknytning={persondata.person.geografiskTilknytning}
                />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={persondata.person.tilrettelagtKommunikasjon} />
                <Vergemal feilendeSystemer={persondata.feilendeSystemer} vergemal={persondata.person.vergemal} />
                <Sikkerhetstiltak sikkerhetstiltak={persondata.person.sikkerhetstiltak} />
                <FlyttingInfo person={persondata.person} />
                <LenkeBrukerprofil />
            </Kolonne>
        </>
    );
}

function TripleColumnLayout(persondata: PersonData) {
    return (
        <>
            <Kolonne>
                <DodsdatoInfo person={persondata.person} />
                <Kontaktinformasjon persondata={persondata} />
                <Fullmakter feilendeSystemer={persondata.feilendeSystemer} fullmakter={persondata.person.fullmakt} />
            </Kolonne>
            <Kolonne>
                <Familie feilendeSystemer={persondata.feilendeSystemer} person={persondata.person} />
                <Foreldreansvar
                    feilendeSystemer={persondata.feilendeSystemer}
                    foreldreansvar={persondata.person.foreldreansvar}
                />
                <DeltBosted deltBosted={persondata.person.deltBosted} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={persondata.person.tilrettelagtKommunikasjon} />
                <Vergemal feilendeSystemer={persondata.feilendeSystemer} vergemal={persondata.person.vergemal} />
            </Kolonne>
            <Kolonne>
                <NavKontor
                    feilendeSystemer={persondata.feilendeSystemer}
                    navEnhet={persondata.person.navEnhet}
                    geografiskTilknytning={persondata.person.geografiskTilknytning}
                />
                <Sikkerhetstiltak sikkerhetstiltak={persondata.person.sikkerhetstiltak} />
                <FlyttingInfo person={persondata.person} />
                <LenkeBrukerprofil />
            </Kolonne>
        </>
    );
}

function VisittkortBody({ persondata }: Props) {
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
            return SingleColumnLayout(persondata);
        }
        if (antallKolonner === 2) {
            return DoubleColumnLayout(persondata);
        }
        return TripleColumnLayout(persondata);
    }

    const maxColumnWidth = 275;
    const numberOfColumns = Math.floor(width / maxColumnWidth);
    const columnLayOut = getColumnLayout(numberOfColumns);

    return (
        <ErrorBoundary boundaryName="Visittkort detaljer">
            {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
            <VisittkortBodyWrapper role="region" aria-label="Visittkortdetaljer">
                <VisuallyHiddenAutoFokusHeader tittel="Visittkortdetaljer" />
                {columnLayOut}
            </VisittkortBodyWrapper>
        </ErrorBoundary>
    );
}

export default VisittkortBody;
