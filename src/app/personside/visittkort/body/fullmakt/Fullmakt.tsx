import * as React from 'react';
import { Fullmakt as FullmaktInterface } from '../../../../../models/person/fullmakter';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';

function getOmraade(omraader: string[]): string {
    if (omraader.includes('*')) {
        return 'alle ytelser';
    }
    return omraader.join(', ');
}

function Fullmakter(props: { fullmakter: FullmaktInterface[] }) {
    const fullmakter = props.fullmakter.map(fullmakt => {
        const beskrivelse = fullmakt.fullmektig
            ? `Fullmektig: ${fullmakt.fullmektig}`
            : `Fullmaktsgiver: ${fullmakt.fullmaktsgiver}`;
        return (
            <VisittkortElement beskrivelse={beskrivelse}>
                <Normaltekst>Gyldig fra og med {fullmakt.gyldigFraOgMed}</Normaltekst>
                <Normaltekst>Gyldig til og med {fullmakt.gyldigTilOgMed}</Normaltekst>
                <Normaltekst>Gjelder {getOmraade(fullmakt.omraade)}</Normaltekst>
            </VisittkortElement>
        );
    });

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter}
        </VisittkortGruppe>
    );
}

function FullmaktWrapper(props: { fullmakter?: FullmaktInterface[] }) {
    if (!props.fullmakter || props.fullmakter.length === 0) {
        return null;
    }

    return <Fullmakter fullmakter={props.fullmakter} />;
}

export default FullmaktWrapper;
