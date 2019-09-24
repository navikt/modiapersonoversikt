import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { isFailedPosting, isFinishedPosting, isNotStartedPosting, isPosting } from '../../rest/utils/postResource';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AdresseCelle, BostedCelle, IdentCelle, NavnCelle } from './PersonsokResultatElementer';
import { ClickableTable } from '../../utils/table/ClickableTable';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { setNyBrukerIPath } from '../routes/routing';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props extends RouteComponentProps {
    onClose: () => void;
}

function PersonsokResultat(props: Props) {
    const personsokResource = useSelector((state: AppState) => state.restResources.personsok);

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

    const tittelRekke = ['Fødselsnummer', 'Navn', 'Adresser', 'Bosted'];
    const response = personsokResource.response;

    if (response.length === 0) {
        return <AlertStripeInfo>Søket ga ingen treff</AlertStripeInfo>;
    }

    const tableEntries = response.map(linje => [
        <IdentCelle ident={linje.ident} />,
        <NavnCelle navn={linje.navn} status={linje.status} />,
        <AdresseCelle response={linje} />,
        <BostedCelle brukerinfo={linje.brukerinfo} />
    ]);
    const handlers = response.map(linje => () => {
        props.onClose();
        setNyBrukerIPath(props.history, linje.ident.ident);
    });

    return <ClickableTable tittelRekke={tittelRekke} rows={tableEntries} rowsOnClickHandlers={handlers} />;
}

export default withRouter(PersonsokResultat);
