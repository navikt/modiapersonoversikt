import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { hentAlderEllerDodRelasjon, hentNavn } from '../../visittkort-utils';
import VisittkortElement from '../VisittkortElement';
import BostedForRelasjon from './common/BostedForRelasjon';
import Diskresjonskode from './common/Diskresjonskode';
import FamilierelasjonIkon from './common/FamilierelasjonIkon';

interface Props {
    relasjon: ForelderBarnRelasjon;
    beskrivelse: string;
    erBarn: boolean;
}

function ForelderBarnRelasjonVisning({ relasjon, beskrivelse, erBarn }: Props) {
    const alder = `(${hentAlderEllerDodRelasjon(relasjon)})`;
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}>
            <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
            <Normaltekst>
                {hentNavn(relasjon.navn.firstOrNull())} {alder}
            </Normaltekst>
            <Normaltekst>{relasjon.ident}</Normaltekst>
            <Normaltekst>
                <BostedForRelasjon relasjon={relasjon} />
            </Normaltekst>
        </VisittkortElement>
    );
}

export default ForelderBarnRelasjonVisning;
