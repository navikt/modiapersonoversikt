import * as React from 'react';
import { isFailedPosting, isFinishedPosting, isNotStartedPosting, isPosting } from '../../rest/utils/postResource';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import Sokeresultat from './Sokeresultat';
import { usePostResource } from '../../rest/consumer/usePostResource';

interface Props {
    onClose: () => void;
}

function PersonsokResultat(props: Props) {
    const personsokResource = usePostResource(resources => resources.personsok);

    if (isNotStartedPosting(personsokResource)) {
        return null;
    }

    if (isPosting(personsokResource)) {
        return <NavFrontendSpinner />;
    }

    if (isFailedPosting(personsokResource)) {
        return <AlertStripeAdvarsel>{personsokResource.error}</AlertStripeAdvarsel>;
    }

    if (!isFinishedPosting(personsokResource)) {
        return <AlertStripeAdvarsel>Noe gikk galt</AlertStripeAdvarsel>;
    }

    const response = personsokResource.response;

    if (response.length === 0) {
        return <AlertStripeInfo>Søket ga ingen treff</AlertStripeInfo>;
    }

    return <Sokeresultat onClose={props.onClose} response={response} />;
}

export default PersonsokResultat;
