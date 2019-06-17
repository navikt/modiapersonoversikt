import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { PersonsokResponse } from '../../models/person/personsok';
import PersonsokResultatLinje from './PersonsokResultatLinje';
import { isFinishedPosting } from '../../rest/utils/postResource';

interface PersonsokResultatProps {
    resultat: PersonsokResponse[];
}

function PersonsokResultatListe(props: PersonsokResultatProps) {
    console.log(props.resultat);
    return (
        <>
            {props.resultat.map(linje => (
                <PersonsokResultatLinje resultat={linje} key={''} />
            ))}
        </>
    );
}

function PersonsokResultat() {
    const personsokResource = useSelector((state: AppState) => state.restResources.personsok);

    if (isFinishedPosting(personsokResource)) {
        return <PersonsokResultatListe resultat={personsokResource.response} />;
    } else {
        return <div />;
    }
}

export default PersonsokResultat;
