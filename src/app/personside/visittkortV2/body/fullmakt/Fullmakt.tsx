import * as React from 'react';
import { Fullmakt as FullmaktInterface } from '../../../../../models/personPdl/fullmakt';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../utils/string-utils';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';

function getOmraade(omraader: string[]): string {
    if (omraader.includes('*')) {
        return 'alle ytelser';
    }
    return omraader.join(', ');
}

function Fullmakt(props: { fullmakt: FullmaktInterface }) {
    const { fullmakt } = props;

    const motpartsPersonNavn = fullmakt.motpartsPersonNavn ?? '';

    const beskrivelse = `${fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver'}
    : ${motpartsPersonNavn}(${fullmakt.motpartsPersonident})`;

    return (
        <VisittkortElement beskrivelse={beskrivelse}>
            <Normaltekst>Gyldig fra og med {formaterDato(fullmakt.gyldigFraOgMed)}</Normaltekst>
            <Normaltekst>Gyldig til og med {formaterDato(fullmakt.gyldigTilOgMed)}</Normaltekst>
            <Normaltekst>Gjelder {getOmraade(fullmakt.omraade)}</Normaltekst>
        </VisittkortElement>
    );
}

function Fullmakter(props: { fullmakter?: FullmaktInterface[] }) {
    if (!props.fullmakter || props.fullmakter.length === 0) {
        return null;
    }

    const fullmakter = props.fullmakter.map((fullmakt, index) => <Fullmakt key={index} fullmakt={fullmakt} />);

    return (
        <VisittkortGruppe tittel={'fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
