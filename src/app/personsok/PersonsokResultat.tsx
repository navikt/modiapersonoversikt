import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import setNyGjeldendeBruker from '../../redux/gjeldendeBruker/actions';
import { ClickableTable } from '../../utils/table/ClickableTable';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    onClose: () => void;
}

function PersonsokResultat(props: Props) {
    const dispatch = useDispatch();
    const personsokResource = useSelector((state: AppState) => state.restResources.personsok);

    if (isNotStartedPosting(personsokResource)) {
        return null;
    }
    if (isPosting(personsokResource)) {
        return <NavFrontendSpinner />;
    }
    if (!isFinishedPosting(personsokResource)) {
        return <AlertStripeAdvarsel>Noe gikk feil</AlertStripeAdvarsel>;
    }

    const tittelRekke = ['Fødselsnummer', 'Navn', 'Midlertidig adresse', 'Postadresse', 'Bostedsadresse', 'Bosted'];
    const response = personsokResource.response;
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
        dispatch(setNyGjeldendeBruker(linje.ident.ident));
    });

    return <ClickableTable tittelRekke={tittelRekke} rows={tableEntries} rowsOnClickHandlers={handlers} />;
}

export default PersonsokResultat;
