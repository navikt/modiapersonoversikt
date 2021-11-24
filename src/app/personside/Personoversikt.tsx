import * as React from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import MainLayout from './MainLayout';
import { useFodselsnummer, useOnMount } from '../../utils/customHooks';
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
import { PersonRespons } from '../../models/person/person';

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved sjekking av tilgang til bruker.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Personoversikt() {
    const fnr = useFodselsnummer();
    const history = useHistory();

    useOnMount(() => {
        if (!erGydligishFnr(fnr)) {
            loggInfo('Ugyldig fnr, redirecter til startside');
            history.push(`${paths.basePath}?sokFnr=${fnr}`);
        }
    });

    return (
        <RestResourceConsumer<TilgangDTO>
            getResource={(resources) => resources.tilgangskontroll}
            returnOnPending={BigCenteredLazySpinner}
            returnOnError={onError}
        >
            {(data) => {
                if (!data.harTilgang) {
                    return <BegrensetTilgangSide tilgangsData={data} />;
                }
                return (
                    <>
                        <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                        <RestResourceConsumer<PersonRespons>
                            getResource={(restResources) => restResources.personinformasjon}
                            returnOnPending={BigCenteredLazySpinner}
                            returnOnError={onError}
                        >
                            {() => <MainLayout />}
                        </RestResourceConsumer>
                    </>
                );
            }}
        </RestResourceConsumer>
    );
}

export default Personoversikt;
