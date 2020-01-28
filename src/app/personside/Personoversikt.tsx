import * as React from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { erPersonResponsAvTypeBegrensetTilgang } from '../../models/person/person';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import MainLayout from './MainLayout';
import { useFødselsnummer, useOnMount } from '../../utils/customHooks';
import { isFinishedPosting } from '../../rest/utils/postResource';
import { setJobberMedSTO } from '../../redux/session/session';
import { useDispatch } from 'react-redux';
import { usePostResource } from '../../rest/consumer/usePostResource';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import { erGydligishFnr } from '../../utils/fnr-utils';

function Personoversikt() {
    const personResource = useRestResource(resources => resources.personinformasjon);
    const oppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();

    useOnMount(() => {
        const harHentetOppgave = isFinishedPosting(oppgaveResource);
        if (harHentetOppgave) {
            dispatch(setJobberMedSTO(true));
        } else {
            dispatch(setJobberMedSTO(false));
        }
    });

    if (!erGydligishFnr(fnr)) {
        return (
            <FillCenterAndFadeIn>
                <AlertStripeAdvarsel>Ugyldig fødselsnummer: {fnr}</AlertStripeAdvarsel>
            </FillCenterAndFadeIn>
        );
    }

    const content =
        personResource.data && erPersonResponsAvTypeBegrensetTilgang(personResource.data) ? (
            <BegrensetTilgangSide person={personResource.data} />
        ) : (
            <MainLayout />
        );

    return (
        <>
            <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
            {content}
        </>
    );
}

export default Personoversikt;
