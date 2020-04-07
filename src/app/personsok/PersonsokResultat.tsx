import * as React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import Sokeresultat from './Sokeresultat';
import { PersonsokResponse } from '../../models/person/personsok';
import { FetchResponse, hasError } from '../../utils/fetchToJson';

interface Props {
    onClose: () => void;
    response?: FetchResponse<PersonsokResponse[]>;
    posting: boolean;
}

function PersonsokResultat(props: Props) {
    if (!props.response) {
        return null;
    }

    if (props.posting) {
        return <NavFrontendSpinner />;
    }

    if (props.response.status === 400) {
        return <AlertStripeAdvarsel>Søket gav mer enn 200 treff. Forsøk å begrense søket</AlertStripeAdvarsel>;
    }

    if (hasError(props.response)) {
        return <AlertStripeAdvarsel>Noe gikk galt</AlertStripeAdvarsel>;
    }

    const data = props.response.data;

    if (data.length === 0) {
        return <AlertStripeInfo>Søket ga ingen treff</AlertStripeInfo>;
    }

    return <Sokeresultat onClose={props.onClose} response={data} />;
}

export default PersonsokResultat;
