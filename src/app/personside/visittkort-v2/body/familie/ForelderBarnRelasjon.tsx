import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { hentAlderEllerDod, hentNavn } from '../../visittkort-utils';
import VisittkortElement from '../VisittkortElement';
import BostedForRelasjon from './common/BostedForRelasjon';
import Diskresjonskode from './common/Diskresjonskode';
import FamilierelasjonIkon from './common/FamilierelasjonIkon';

interface Props {
    harFeilendeSystem: boolean;
    relasjon: ForelderBarnRelasjon;
    beskrivelse: string;
    erBarn: boolean;
}

function ForelderBarnRelasjonVisning({ harFeilendeSystem, relasjon, beskrivelse, erBarn }: Props) {
    if (harFeilendeSystem) {
        return (
            <VisittkortElement
                beskrivelse={beskrivelse}
                ikon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}
            >
                <Feilmelding>Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}</Feilmelding>
            </VisittkortElement>
        );
    }
    const alder = hentAlderEllerDod(relasjon) ? `(${hentAlderEllerDod(relasjon)})` : null;
    const navn = relasjon.navn.firstOrNull();
    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}>
            <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
            <Normaltekst>
                {navn && hentNavn(navn)} {alder}
            </Normaltekst>
            <Normaltekst>{relasjon.ident}</Normaltekst>
            <Normaltekst>
                <BostedForRelasjon relasjon={relasjon} />
            </Normaltekst>
        </VisittkortElement>
    );
}

export default ForelderBarnRelasjonVisning;
