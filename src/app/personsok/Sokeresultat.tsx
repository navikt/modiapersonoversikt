import { default as React, useRef } from 'react';
import { AdresseCelle, BostedCelle, IdentCelle, NavnCelle, UtenlandskIDCelle } from './PersonsokResultatElementer';
import { setNyBrukerIPath } from '../routes/routing';
import { ClickableTable } from '../../utils/table/ClickableTable';
import { PersonsokResponse } from '../../models/person/personsok';
import { useHistory } from 'react-router';
import { useFocusOnMount } from '../../utils/customHooks';

interface Props {
    response: PersonsokResponse[];
    onClose: () => void;
}
function Sokeresultat(props: Props) {
    const ref = useRef<HTMLElement>(null);
    const history = useHistory();

    useFocusOnMount(ref);

    const tittelRekke = ['Fødselsnummer', 'Navn', 'Adresser', 'Bosted'];
    let linje;
    for (linje of props.response) {
        if (linje.utenlandskID && linje.request?.utenlandskID) {
            tittelRekke.push('Utenlandsk ID');
        }
    }

    const tableEntries = props.response.map(linje => [
        <IdentCelle ident={linje.ident} />,
        <NavnCelle navn={linje.navn} status={linje.status} />,
        <AdresseCelle response={linje} />,
        <BostedCelle brukerinfo={linje.brukerinfo} />,
        <UtenlandskIDCelle utenlandskID={linje.utenlandskID} />
    ]);

    const handlers = props.response.map(linje => () => {
        props.onClose();
        setNyBrukerIPath(history, linje.ident.ident);
    });

    return (
        <article aria-label="Søkeresultat">
            <span tabIndex={-1} ref={ref} className="sr-only">
                Søket fant {props.response.length} treff
            </span>
            <ClickableTable tittelRekke={tittelRekke} rows={tableEntries} rowsOnClickHandlers={handlers} />
        </article>
    );
}

export default Sokeresultat;
