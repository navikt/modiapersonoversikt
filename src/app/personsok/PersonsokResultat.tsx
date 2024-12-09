import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import type { PersonsokResponse } from '../../models/person/personsok';
import { type FetchResponse, hasError } from '../../utils/fetchToJson';
import Sokeresultat from './Sokeresultat';

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

    if (hasError(props.response)) {
        let message = props.response.message;
        if (!message || !message.length) {
            message = 'Det skjedde en feil ved søk.';
        }
        return <AlertStripeAdvarsel>{message}</AlertStripeAdvarsel>;
    }

    const data = props.response.data;

    if (data.length === 0) {
        return <AlertStripeInfo>Søket ga ingen treff</AlertStripeInfo>;
    }

    return <Sokeresultat onClose={props.onClose} response={data} />;
}

export default PersonsokResultat;
