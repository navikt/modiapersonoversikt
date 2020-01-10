import * as React from 'react';
import { Fullmakt as FullmaktInterface } from '../../../../../models/person/fullmakter';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { useFetchWithLog } from '../../../../../utils/hooks/useFetchWithLog';
import { apiBaseUri } from '../../../../../api/config';
import { hasData } from '@nutgaard/use-fetch';
import { PersonRespons } from '../../../../../models/person/person';
import { isLoadedPerson } from '../../../../../redux/restReducers/personinformasjon';

function getOmraade(omraader: string[]): string {
    if (omraader.includes('*')) {
        return 'alle ytelser';
    }
    return omraader.join(', ');
}

function Fullmakt(props: { fullmakt: FullmaktInterface }) {
    const fullmektig = useFetchWithLog<PersonRespons>(
        `${apiBaseUri}/person/${props.fullmakt.motpartsPersonident}`,
        'Fullmektig'
    );

    const navn = (hasData(fullmektig) && isLoadedPerson(fullmektig.data) && fullmektig.data.navn.sammensatt) || '';

    const beskrivelse = `${props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver'}: ${navn} (${
        props.fullmakt.motpartsPersonident
    })`;

    return (
        <VisittkortElement beskrivelse={beskrivelse}>
            <Normaltekst>Gyldig fra og med {formaterDato(props.fullmakt.gyldigFraOgMed)}</Normaltekst>
            <Normaltekst>Gyldig til og med {formaterDato(props.fullmakt.gyldigTilOgMed)}</Normaltekst>
            <Normaltekst>Gjelder {getOmraade(props.fullmakt.omraade)}</Normaltekst>
        </VisittkortElement>
    );
}

function Fullmakter(props: { fullmakter?: FullmaktInterface[] }) {
    if (!props.fullmakter || props.fullmakter.length === 0) {
        return null;
    }

    const fullmakter = props.fullmakter.map((fullmakt, index) => <Fullmakt key={index} fullmakt={fullmakt} />);

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
