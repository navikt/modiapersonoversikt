import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { PersonsokResponse } from '../../models/person/personsok';
import { isFinishedPosting, isPosting } from '../../rest/utils/postResource';
import NavFrontendSpinner from 'nav-frontend-spinner';
import {
    BostedCelle,
    BostedsadresseCelle,
    IdentCelle,
    MidlertidigAdresseCelle,
    NavnCelle,
    PostadresseCelle
} from './PersonsokResultatElementer';
import { StyledTable } from '../../utils/table/StyledTable';

interface PersonsokResultatProps {
    resultat: PersonsokResponse[];
}

function PersonsokResultatListe(props: PersonsokResultatProps) {
    const tittelRekke = ['Fødselsnummer', 'Navn', 'Midlertidig adresse', 'Postadresse', 'Bostedsadresse', 'Bosted'];
    const tableEntries = props.resultat.map(linje => [
        <IdentCelle ident={linje.ident} />,
        <NavnCelle navn={linje.navn} />,
        <MidlertidigAdresseCelle brukerinfo={linje.brukerinfo} />,
        <PostadresseCelle postadresse={linje.postadresse} />,
        <BostedsadresseCelle bostedsadresse={linje.bostedsadresse} />,
        <BostedCelle brukerinfo={linje.brukerinfo} />
    ]);

    // TODO Legge til rowClickHandlers (setNyBrukerIPath(this.props.history, fødselsnummer);)

    return <StyledTable tittelRekke={tittelRekke} rows={tableEntries} />;
}

function PersonsokResultat() {
    const personsokResource = useSelector((state: AppState) => state.restResources.personsok);

    if (isFinishedPosting(personsokResource)) {
        return <PersonsokResultatListe resultat={personsokResource.response} />;
    } else if (isPosting(personsokResource)) {
        return <NavFrontendSpinner />;
    } else {
        return null;
    }
}

export default PersonsokResultat;
