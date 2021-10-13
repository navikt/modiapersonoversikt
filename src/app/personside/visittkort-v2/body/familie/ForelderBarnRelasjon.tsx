import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { harDiskresjonskode } from '../../person-utils';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { hentAlderEllerDodRelasjon, hentNavn } from '../../utils-visittkort';
import VisittkortElement from '../VisittkortElement';
import BostedForRelasjon from './common/BostedForRelasjon';
import Diskresjonskode from './common/Diskresjonskode';
import { FamilierelasjonIkon } from './common/FamilierelasjonIkon';

interface Props {
    relasjon: ForelderBarnRelasjon;
    beskrivelse: string;
    erBarn: boolean;
}

function ForelderBarnRelasjonVisning({ relasjon, beskrivelse, erBarn }: Props) {
    const adressebeskyttet: boolean = harDiskresjonskode(relasjon.adressebeskyttelse);
    const alder = adressebeskyttet ? '' : `(${hentAlderEllerDodRelasjon(relasjon)})`;
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}>
            <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
            {/* // TODO: skal relasjonens navn vises dersom kode6/7 */}
            <Normaltekst>
                {hentNavn(relasjon.navn.firstOrNull())} {alder}
            </Normaltekst>
            {!adressebeskyttet && <Normaltekst>{relasjon.ident}</Normaltekst>}
            <Normaltekst>
                <BostedForRelasjon relasjon={relasjon} />
            </Normaltekst>
        </VisittkortElement>
    );
}

export default ForelderBarnRelasjonVisning;
