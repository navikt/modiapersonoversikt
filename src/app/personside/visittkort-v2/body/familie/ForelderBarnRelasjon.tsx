import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import Personopplysninger from 'src/components/PersonLinje/Personopplysninger';
import type { ForelderBarnRelasjon } from '../../PersondataDomain';
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
    const alder = hentAlderEllerDod(relasjon) ? `(${hentAlderEllerDod(relasjon)})` : null;
    const navn = relasjon.navn.firstOrNull();
    return (
        <VisittkortElement
            beskrivelse={relasjon.skjulingsaarsak && erBarn ? 'Barn' : beskrivelse}
            ikon={relasjon.skjulingsaarsak ? undefined : <FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}
        >
            <Personopplysninger
                skjulingsaarsak={relasjon.skjulingsaarsak}
                tilgangsavslag={relasjon.tilgangsavslag}
                tekstKomponent={Normaltekst}
            >
                {harFeilendeSystem && !navn && !relasjon.ident && !alder ? (
                    <Feilmelding>Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}</Feilmelding>
                ) : (
                    <>
                        <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
                        <Normaltekst>
                            {navn && hentNavn(navn)} {alder}
                        </Normaltekst>
                        <Normaltekst>{relasjon.ident ? relasjon.ident : 'Ukjent'}</Normaltekst>
                        {relasjon.harSammeAdresse != null && (
                            <Normaltekst>
                                <BostedForRelasjon relasjon={relasjon} />
                            </Normaltekst>
                        )}
                    </>
                )}
            </Personopplysninger>
        </VisittkortElement>
    );
}

export default ForelderBarnRelasjonVisning;
