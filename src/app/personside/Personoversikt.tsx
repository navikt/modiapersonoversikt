import * as React from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import MainLayout from './MainLayout';
import { useFødselsnummer, useOnMount } from '../../utils/customHooks';
import { isFinishedPosting } from '../../rest/utils/postResource';
import { setJobberMedSTO } from '../../redux/session/session';
import { useDispatch } from 'react-redux';
import { usePostResource } from '../../rest/consumer/usePostResource';
import { erGydligishFnr } from '../../utils/fnr-utils';
import { useHistory } from 'react-router';
import { paths } from '../routes/routing';
import { loggInfo } from '../../utils/logger/frontendLogger';
import RestResourceConsumer from '../../rest/consumer/RestResourceConsumer';
import { TilgangDTO } from '../../redux/restReducers/tilgangskontroll';
import { BigCenteredLazySpinner } from '../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import BegrensetTilgangSide from './BegrensetTilgangSide';

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved sjekking av tilgang til bruker.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Personoversikt() {
    const oppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();
    const history = useHistory();

    useOnMount(() => {
        if (isFinishedPosting(oppgaveResource)) {
            const oppgaver = oppgaveResource.response;
            const harSTOOppgave = oppgaver.some(oppgave => oppgave.erSTOOppgave);
            dispatch(setJobberMedSTO(!harSTOOppgave));
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

    return (
        <RestResourceConsumer<TilgangDTO>
            getResource={resources => resources.tilgangskontroll}
            returnOnPending={BigCenteredLazySpinner}
            returnOnError={onError}
        >
            {data => {
                if (!data.harTilgang) {
                    return <BegrensetTilgangSide tilgangsData={data} />;
                }
                return (
                    <>
                        <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                        <MainLayout />
                    </>
                );
            }}
        </RestResourceConsumer>
    );
}

export default Personoversikt;
