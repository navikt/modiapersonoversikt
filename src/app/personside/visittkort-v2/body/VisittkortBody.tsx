import * as React from 'react';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { Data as PersonData, InformasjonElement } from '../PersondataDomain';
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
import NavKontor from './navkontor/NavKontor';
import { harFeilendeSystemer } from '../harFeilendeSystemer';

interface Props {
    persondata: PersonData;
}

function SingleColumnLayout(persondata: PersonData) {
    return (
        <Kolonne>
            <Kontaktinformasjon persondata={persondata} />
            <Fullmakter
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                fullmakter={persondata.person.fullmakt}
            />
            <Familie
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                person={persondata.person}
            />
            <DeltBosted deltBosted={persondata.person.deltBosted} />
            <Foreldreansvar
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                foreldreansvar={persondata.person.foreldreansvar}
            />
            <NavKontor
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.NORG_NAVKONTOR)}
                navEnhet={persondata.person.navEnhet}
            />
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={persondata.person.tilrettelagtKommunikasjon} />
            <Vergemal
                feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                vergemal={persondata.person.vergemal}
            />
            <Sikkerhetstiltak sikkerhetstiltak={persondata.person.sikkerhetstiltak} />
            <LenkeBrukerprofil />
        </Kolonne>
    );
}

function DoubleColumnLayout(persondata: PersonData) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon persondata={persondata} />
                <Fullmakter
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    fullmakter={persondata.person.fullmakt}
                />
                <Familie
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    person={persondata.person}
                />
                <DeltBosted deltBosted={persondata.person.deltBosted} />
                <Foreldreansvar
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    foreldreansvar={persondata.person.foreldreansvar}
                />
            </Kolonne>
            <Kolonne>
                <NavKontor
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.NORG_NAVKONTOR)}
                    navEnhet={persondata.person.navEnhet}
                />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={persondata.person.tilrettelagtKommunikasjon} />
                <Vergemal
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    vergemal={persondata.person.vergemal}
                />
                <Sikkerhetstiltak sikkerhetstiltak={persondata.person.sikkerhetstiltak} />
                <LenkeBrukerprofil />
            </Kolonne>
        </>
    );
}

function TripleColumnLayout(persondata: PersonData) {
    return (
        <>
            <Kolonne>
                <Kontaktinformasjon persondata={persondata} />
                <Fullmakter
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    fullmakter={persondata.person.fullmakt}
                />
            </Kolonne>
            <Kolonne>
                <Familie
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    person={persondata.person}
                />
                <Foreldreansvar
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    foreldreansvar={persondata.person.foreldreansvar}
                />
                <DeltBosted deltBosted={persondata.person.deltBosted} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={persondata.person.tilrettelagtKommunikasjon} />
                <Vergemal
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.PDL_TREDJEPARTSPERSONER)}
                    vergemal={persondata.person.vergemal}
                />
            </Kolonne>
            <Kolonne>
                <NavKontor
                    feilendeSystem={harFeilendeSystemer(persondata, InformasjonElement.NORG_NAVKONTOR)}
                    navEnhet={persondata.person.navEnhet}
                />
                <Sikkerhetstiltak sikkerhetstiltak={persondata.person.sikkerhetstiltak} />
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
        } else if (antallKolonner === 2) {
            return DoubleColumnLayout(persondata);
        }
        return TripleColumnLayout(persondata);
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
