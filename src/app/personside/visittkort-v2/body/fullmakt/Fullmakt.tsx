import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { formaterDato } from '../../../../../utils/string-utils';
import { Fullmakt as FullmaktInterface } from '../../PersondataDomain';
import { hentNavn } from '../../utils-visittkort';

interface Props {
    fullmakter: FullmaktInterface[];
}

function getOmrade(omrader: string[]): string {
    if (omrader.includes('*')) {
        return 'alle ytelser';
    }
    return omrader.join(', ');
}

function Fullmakt(props: { fullmakt: FullmaktInterface }) {
    const motpartsPersonNavn = hentNavn(props.fullmakt.motpartsPersonNavn);

    const beskrivelse = `${props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver'}
    : ${motpartsPersonNavn} (${props.fullmakt.motpartsPersonident})`;

    return (
        <VisittkortElement beskrivelse={beskrivelse}>
            <Normaltekst>Gyldig fra og med {formaterDato(props.fullmakt.gyldigFraOgMed)}</Normaltekst>
            <Normaltekst>Gyldig til og med {formaterDato(props.fullmakt.gyldigTilOgMed)}</Normaltekst>
            <Normaltekst>Gjelder {getOmrade(props.fullmakt.omraade)}</Normaltekst>
        </VisittkortElement>
    );
}

function Fullmakter({ fullmakter }: Props) {
    if (fullmakter.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter.map((fullmakt, index) => (
                <Fullmakt key={index} fullmakt={fullmakt} />
            ))}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
