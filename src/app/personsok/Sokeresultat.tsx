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
    const trengerUtenlandskIDKolonne = props.response.some(person => person.utenlandskID !== undefined);
    if (trengerUtenlandskIDKolonne) {
        tittelRekke.push('Utenlandsk ID');
    }

    const tableEntries = props.response.map(linje => {
        const entries = [
            <IdentCelle ident={linje.ident} />,
            <NavnCelle navn={linje.navn} status={linje.status} />,
            <AdresseCelle response={linje} />,
            <BostedCelle brukerinfo={linje.brukerinfo} />
        ];
        if (trengerUtenlandskIDKolonne) {
            entries.push(<UtenlandskIDCelle utenlandskID={linje.utenlandskID} />);
        }
        return entries;
    });

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
