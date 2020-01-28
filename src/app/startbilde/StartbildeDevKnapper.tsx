import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { paths, setNyBrukerIPath } from '../routes/routing';
import { useHistory } from 'react-router';
import { aremark } from '../../mock/person/aremark';
import { moss } from '../../mock/person/moss';
import { MOCKED_TRAADID_1 } from '../../mock/meldinger/meldinger-mock';
import { useDispatch } from 'react-redux';
import { useRestResource } from '../../rest/consumer/useRestResource';

function StartbildeDevKnapper() {
    const history = useHistory();
    const behandlingsId = MOCKED_TRAADID_1;
    const dispatch = useDispatch();
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);

    function handleLagOpgaveFraGOSYS() {
        const oppgaveId = 'A1B2C3';
        dispatch(
            tildelteOppgaverResource.actions.setData([
                { oppgaveId: oppgaveId, traadId: behandlingsId, fødselsnummer: aremark.fødselsnummer }
            ])
        ); //TODO: denne skal ligge i en eller annen mock-backend
        document.location.replace(
            `?oppgaveid=${oppgaveId}&behandlingsid=${behandlingsId}&sokFnr=${aremark.fødselsnummer}`
        );
    }

    return (
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
                Sett oppgave i URL
            </KnappBase>
        </>
    );
}

export default StartbildeDevKnapper;
