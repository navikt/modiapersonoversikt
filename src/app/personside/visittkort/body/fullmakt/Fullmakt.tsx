import * as React from 'react';
import { Fullmakt as FullmaktInterface } from '../../../../../models/person/fullmakter';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { formaterDato } from '../../../../../utils/stringFormatting';

function getOmraade(omraader: string[]): string {
    if (omraader.includes('*')) {
        return 'alle ytelser';
    }
    return omraader.join(', ');
}

function Fullmakt(props: { fullmakt: FullmaktInterface }) {
    const { fullmakt } = props;
    const beskrivelse = `${fullmakt.fullmaktsrolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver'}: ${
        fullmakt.motpartsPersonident
    }`;

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

    const fullmakter = props.fullmakter.map(fullmakt => <Fullmakt fullmakt={fullmakt} />);

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
