import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../VisittkortElement';
import Diskresjonskode from './common/Diskresjonskode';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { harDiskresjonskode, hentForeldre } from '../../person-utils';
import { capitalizeName } from '../../../../../utils/string-utils';
import { FamilierelasjonIkon } from './common/FamilierelasjonIkon';
import { hentNavn, hentAlderEllerDodRelasjon } from '../../utils-visittkort';
import BostedForRelasjon from './common/BostedForRelasjon';

interface Props {
    forelderBarnRelasjon: ForelderBarnRelasjon[];
}

function Forelder(props: { relasjon: ForelderBarnRelasjon }) {
    const adressebeskyttet: boolean = harDiskresjonskode(props.relasjon.adressebeskyttelse);
    const alder = adressebeskyttet ? '' : `(${hentAlderEllerDodRelasjon(props.relasjon)})`;
    return (
        <VisittkortElement
            beskrivelse={capitalizeName(props.relasjon.rolle)}
            ikon={<FamilierelasjonIkon relasjon={props.relasjon} erBarn={false} />}
        >
            <Diskresjonskode adressebeskyttelse={props.relasjon.adressebeskyttelse} />
            {/* // TODO: skal relasjonens navn vises dersom kode6/7 */}
            <Normaltekst>
                {hentNavn(props.relasjon.navn.firstOrNull())} {alder}
            </Normaltekst>
            {!adressebeskyttet && <Normaltekst>{props.relasjon.ident}</Normaltekst>}
            <Normaltekst>
                <BostedForRelasjon relasjon={props.relasjon} />
            </Normaltekst>
        </VisittkortElement>
    );
}

function Foreldre({ forelderBarnRelasjon }: Props) {
    const foreldre = hentForeldre(forelderBarnRelasjon);

    return (
        <>
            {foreldre.map(relasjon => (
                <Forelder key={relasjon.ident} relasjon={relasjon} />
            ))}
        </>
    );
}

export default Foreldre;
