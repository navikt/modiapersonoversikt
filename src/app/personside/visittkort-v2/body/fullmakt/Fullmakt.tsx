import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { Fullmakt as FullmaktInterface, KodeBeskrivelse } from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';

interface Props {
    fullmakter: FullmaktInterface[];
}

function getOmrade(omrader: KodeBeskrivelse<string>[]): string {
    if (omrader.map(omrade => omrade.kode).includes('*')) {
        return 'alle ytelser';
    }
    return omrader.map(omrade => omrade.beskrivelse).join(', ');
}

function Fullmakt(props: { fullmakt: FullmaktInterface }) {
    const motpartsPersonNavn = hentNavn(props.fullmakt.motpartsPersonNavn);
    const beskrivelse = props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver';

    return (
        <VisittkortElement>
            <GyldighetsPeriode gyldighetsPeriode={props.fullmakt.gyldighetsPeriode} />
            <Element tag="h4">{beskrivelse}</Element>
            <Normaltekst>
                {motpartsPersonNavn} {`(${props.fullmakt.motpartsPersonident})`}
            </Normaltekst>
            <Normaltekst>Gjelder {getOmrade(props.fullmakt.omrade)}</Normaltekst>
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
