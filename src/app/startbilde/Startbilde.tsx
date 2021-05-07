import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import PersonSokInput from './PersonSokInput';
import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';
import { useFetchFeatureTogglesOnNewFnr } from '../PersonOppslagHandler/FetchFeatureToggles';
import navfaker from 'nav-faker/dist/index';
import KnappBase from 'nav-frontend-knapper';
import { MOCKED_TRAADID_1 } from '../../mock/meldinger/meldinger-mock';
import { useDispatch } from 'react-redux';
import { useRestResource } from '../../rest/consumer/useRestResource';

function Startbilde() {
    useFetchFeatureTogglesOnNewFnr();

    const dispatch = useDispatch();
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);

    const handleLagOpgaveFraGOSYS = () => {
        const behandlingsId = MOCKED_TRAADID_1;
        const oppgaveId = 'A1B2C3';
        const fødselsnummer = navfaker.personIdentifikator.fødselsnummer();
        dispatch(
            tildelteOppgaverResource.actions.setData([
                {
                    oppgaveId: oppgaveId,
                    traadId: behandlingsId,
                    fødselsnummer: fødselsnummer,
                    erSTOOppgave: false
                }
            ])
        ); //TODO: denne skal ligge i en eller annen mock-backend
        document.location.replace(`?oppgaveid=${oppgaveId}&behandlingsid=${behandlingsId}&sokFnr=${fødselsnummer}`);
    };

    return (
        <StartBildeLayout>
            <SetFnrIRedux fnr="" />
            <HentOppgaveKnapp />
            <PersonSokInput />
            <StartbildeInnstillinger />
            <KnappBase onClick={handleLagOpgaveFraGOSYS} type="hoved">
                Oppgave fra gosys
            </KnappBase>
        </StartBildeLayout>
    );
}

export default Startbilde;
