import { useRef } from 'react';
import type { PersonsokResponse } from '../../models/person/personsok';
import { useFocusOnMount, useSettAktivBruker } from '../../utils/customHooks';
import { ClickableTable } from '../../utils/table/ClickableTable';
import { AdresseCelle, BostedCelle, IdentCelle, NavnCelle, UtenlandskIDCelle } from './PersonsokResultatElementer';

interface Props {
    response: PersonsokResponse[];
    onClose: () => void;
}
function Sokeresultat(props: Props) {
    const ref = useRef<HTMLElement>(null);
    const settAktivBruker = useSettAktivBruker();

    useFocusOnMount(ref);

    const tittelRekke = ['Fødselsnummer', 'Navn', 'Adresser', 'Bosted'];
    const trengerUtenlandskIDKolonne = props.response.some((person) =>
        person.utenlandskID?.some((utenlandskID) => utenlandskID.identifikasjonsnummer !== undefined)
    );

    if (trengerUtenlandskIDKolonne) {
        tittelRekke.push('Utenlandsk ID');
    }

    const tableEntries = props.response.map((linje) => {
        const entries = [
            <IdentCelle ident={linje.ident} key={linje.ident.ident} />,
            <NavnCelle navn={linje.navn} status={linje.status} key={linje.ident.ident} />,
            <AdresseCelle response={linje} key={linje.ident.ident} />,
            <BostedCelle brukerinfo={linje.brukerinfo} key={linje.ident.ident} />
        ];
        if (trengerUtenlandskIDKolonne) {
            entries.push(<UtenlandskIDCelle utenlandskID={linje.utenlandskID} />);
        }
        return entries;
    });

    const handlers = props.response.map((linje) => () => {
        props.onClose();
        settAktivBruker(linje.ident.ident);
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
