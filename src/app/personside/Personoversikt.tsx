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
import { erGydligishFnr } from '../../utils/fnr-utils';
import { useHistory } from 'react-router';
import { paths } from '../routes/routing';
import { loggInfo } from '../../utils/frontendLogger';

function Personoversikt() {
    const personResource = useRestResource(resources => resources.personinformasjon);
    const oppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();
    const history = useHistory();

    useOnMount(() => {
        const harHentetOppgave = isFinishedPosting(oppgaveResource);
        if (harHentetOppgave) {
            dispatch(setJobberMedSTO(true));
        } else {
            dispatch(setJobberMedSTO(false));
        }
    });

    useOnMount(() => {
        if (!erGydligishFnr(fnr)) {
            loggInfo('Ugyldig fnr, redirecter til startside');
            history.push(`${paths.basePath}?sokFnr=${fnr}`);
        }
    });

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
