import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { paths, setNyBrukerIPath } from '../routes/routing';
import { Route, useHistory } from 'react-router';
import { aremark } from '../../mock/person/aremark';
import { moss } from '../../mock/person/moss';
import { MOCKED_TRAADID_1 } from '../../mock/meldinger/meldinger-mock';
import { useDispatch } from 'react-redux';
import { useRestResource } from '../../rest/consumer/useRestResource';
import navfaker from 'nav-faker';
import { Link } from 'react-router-dom';
import { mockEnabled } from '../../api/config';

function getRandomFnr() {
    if (navfaker.random.vektetSjanse(0.3)) {
        return 'ugyldigFnr';
    }
    return navfaker.personIdentifikator.fødselsnummer();
}

function StartbildeDevKnapper() {
    const history = useHistory();
    const behandlingsId = MOCKED_TRAADID_1;
    const dispatch = useDispatch();
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);

    function handleLagOpgaveFraGOSYS() {
        const oppgaveId = 'A1B2C3';
        const fødselsnummer = getRandomFnr();
        dispatch(
            tildelteOppgaverResource.actions.setData([
                {
                    oppgaveId: oppgaveId,
                    traadId: behandlingsId,
                    fødselsnummer: fødselsnummer
                }
            ])
        ); //TODO: denne skal ligge i en eller annen mock-backend
        document.location.replace(`?oppgaveid=${oppgaveId}&behandlingsid=${behandlingsId}&sokFnr=${fødselsnummer}`);
    }

    function handleLagHenvendelseFraGosys() {
        const fnr = getRandomFnr();
        document.location.replace(`?behandlingsid=${behandlingsId}&sokFnr=${fnr}`);
    }

    function brukerFraPuzzle() {
        document.location.replace(`?sokFnr=${getRandomFnr()}`);
    }

    return (
        <>
            {mockEnabled && <Link to={`${paths.basePath}/dev`}>Dev</Link>}
            <Route
                path={`${paths.basePath}/dev`}
                render={() => (
                    <>
                        <KnappBase onClick={() => setNyBrukerIPath(history, aremark.fødselsnummer)} type="hoved">
                            Snarvei til Aremark!
                        </KnappBase>
                        <KnappBase onClick={() => setNyBrukerIPath(history, moss.fødselsnummer)} type="hoved">
                            Snarvei til Moss!
                        </KnappBase>
                        <KnappBase onClick={() => history.push(paths.standaloneKomponenter)} type="hoved">
                            Snarvei til standalone-komponenter
                        </KnappBase>
                        <KnappBase onClick={handleLagOpgaveFraGOSYS} type="hoved">
                            Oppgave fra gosys
                        </KnappBase>
                        <KnappBase onClick={handleLagHenvendelseFraGosys} type="hoved">
                            Henvendelse fra gosys
                        </KnappBase>
                        <KnappBase onClick={brukerFraPuzzle} type="hoved">
                            Puzzleoppslag
                        </KnappBase>
                    </>
                )}
            />
        </>
    );
}

export default StartbildeDevKnapper;
