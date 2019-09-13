import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { isFinishedPosting, isNotStartedPosting, isPosting } from '../../rest/utils/postResource';
import NavFrontendSpinner from 'nav-frontend-spinner';
import {
    BostedCelle,
    BostedsadresseCelle,
    IdentCelle,
    MidlertidigAdresseCelle,
    NavnCelle,
    PostadresseCelle
} from './PersonsokResultatElementer';
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
    if (!isFinishedPosting(personsokResource)) {
        return <AlertStripeAdvarsel>Søket gav mer enn 200 treff. Forsøk å begrense søket.</AlertStripeAdvarsel>;
    }

    const tittelRekke = ['Fødselsnummer', 'Navn', 'Midlertidig adresse', 'Postadresse', 'Bostedsadresse', 'Bosted'];
    const response = personsokResource.response;

    if (response.length === 0) {
        return <AlertStripeInfo>Søket ga ingen treff</AlertStripeInfo>;
    }

    const tableEntries = response.map(linje => [
        <IdentCelle ident={linje.ident} />,
        <NavnCelle navn={linje.navn} status={linje.status} />,
        <MidlertidigAdresseCelle brukerinfo={linje.brukerinfo} />,
        <PostadresseCelle postadresse={linje.postadresse} />,
        <BostedsadresseCelle bostedsadresse={linje.bostedsadresse} />,
        <BostedCelle brukerinfo={linje.brukerinfo} />
    ]);
    const handlers = response.map(linje => () => {
        props.onClose();
        setNyBrukerIPath(props.history, linje.ident.ident);
    });

    return <ClickableTable tittelRekke={tittelRekke} rows={tableEntries} rowsOnClickHandlers={handlers} />;
}

export default withRouter(PersonsokResultat);
