import * as React from 'react';
import StartBildeLayout from './StartBildeLayout';
import HentOppgaveKnapp from '../personside/dialogpanel/HentOppgaveKnapp';
import SetFnrIRedux from '../PersonOppslagHandler/SetFnrIRedux';
import PersonSokInput from './PersonSokInput';
import StartbildeInnstillinger from '../innstillinger/startbilde-innstillinger';
import { useFetchFeatureTogglesOnNewFnr } from '../PersonOppslagHandler/FetchFeatureToggles';
import { useAppState, useJustOnceEffect } from '../../utils/customHooks';
import { erKontaktsenter } from '../../utils/enheter-utils';
import Hotjar, { HotjarTriggers } from '../../utils/hotjar';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function useTriggerHotjarForLokalKontor() {
    const bruksmonsterSurveyAktiv = useFeatureToggle(FeatureToggles.BruksmonsterSurvey).isOn ?? false;
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);

    useJustOnceEffect(
        done => {
            if (valgtEnhet && bruksmonsterSurveyAktiv && !erKontaktsenter(valgtEnhet)) {
                Hotjar.trigger(HotjarTriggers.BRUKSMONSTER);
                done();
            }
        },
        [bruksmonsterSurveyAktiv, valgtEnhet]
    );
}

function Startbilde() {
    useFetchFeatureTogglesOnNewFnr();
    useTriggerHotjarForLokalKontor();

    return (
        <StartBildeLayout>
            <SetFnrIRedux fødselsnummer="" />
            <HentOppgaveKnapp />
            <PersonSokInput />
            <StartbildeInnstillinger />
        </StartBildeLayout>
    );
}

export default Startbilde;
