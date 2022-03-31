import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { hentAlderEllerDod, hentNavn } from '../../visittkort-utils';
import VisittkortElement from '../VisittkortElement';
import BostedForRelasjon from './common/BostedForRelasjon';
import Diskresjonskode from './common/Diskresjonskode';
import FamilierelasjonIkon from './common/FamilierelasjonIkon';
import FeilendeSystemAdvarsel from '../../FeilendeSystemAdvarsel';

interface Props {
    feilendeSystem: boolean;
    relasjon: ForelderBarnRelasjon;
    beskrivelse: string;
    erBarn: boolean;
}

function ForelderBarnRelasjonVisning({ feilendeSystem, relasjon, beskrivelse, erBarn }: Props) {
    if (feilendeSystem) {
        return (
            <VisittkortElement
                beskrivelse={beskrivelse}
                ikon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}
            >
                <FeilendeSystemAdvarsel>
                    Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}
                </FeilendeSystemAdvarsel>
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
