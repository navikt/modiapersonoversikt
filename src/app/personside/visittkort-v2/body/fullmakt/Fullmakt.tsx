import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import { Normaltekst } from 'nav-frontend-typografi';
import { VisittkortGruppe } from '../VisittkortStyles';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { Fullmakt as FullmaktInterface, InformasjonElement, KodeBeskrivelse } from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';
import FeilendeSystemAdvarsel from '../../FeilendeSystemAdvarsel';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    fullmakter: FullmaktInterface[];
}

function getOmrade(omrader: KodeBeskrivelse<string>[]): string {
    if (omrader.map((omrade) => omrade.kode).includes('*')) {
        return 'alle ytelser';
    }
    return omrader.map((omrade) => omrade.beskrivelse).join(', ');
}

function Fullmakt(props: { fullmakt: FullmaktInterface; harFeilendeSystem: boolean }) {
    const motpartsPersonNavn = hentNavn(props.fullmakt.motpartsPersonNavn);
    const beskrivelse = props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver';
    const harFeilendeSystem = props.harFeilendeSystem ? (
        <FeilendeSystemAdvarsel>Feilet ved uthenting av navn</FeilendeSystemAdvarsel>
    ) : null;

    return (
        <VisittkortElement beskrivelse={beskrivelse}>
            {harFeilendeSystem}
            <Normaltekst>
                {motpartsPersonNavn} {`(${props.fullmakt.motpartsPersonident})`}
            </Normaltekst>
            <Normaltekst>Gjelder {getOmrade(props.fullmakt.omrade)}</Normaltekst>
            <GyldighetsPeriode gyldighetsPeriode={props.fullmakt.gyldighetsPeriode} />
        </VisittkortElement>
    );
}

function Fullmakter({ feilendeSystemer, fullmakter }: Props) {
    if (fullmakter.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter.map((fullmakt, index) => (
                <Fullmakt
                    key={index}
                    fullmakt={fullmakt}
                    harFeilendeSystem={harFeilendeSystemer(
                        feilendeSystemer,
                        InformasjonElement.PDL_TREDJEPARTSPERSONER
                    )}
                />
            ))}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
