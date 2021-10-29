import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import SikkerhetsTiltakIkon from '../../../../../svg/Sikkerhetstiltak';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';
import { Sikkerhetstiltak as SikkerhetstiltakInterface } from '../../PersondataDomain';
import { hentPeriodeTekst } from '../../visittkort-utils';
import EtikettGraa from '../../../../../components/EtikettGraa';

interface Props {
    sikkerhetstiltak: SikkerhetstiltakInterface[];
}

function Sikkerhetstiltak({ sikkerhetstiltak }: Props) {
    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }
    return (
        <VisittkortGruppe tittel="Sikkerhetstiltak" ikon={<SikkerhetsTiltakIkon />}>
            <VisittkortElement>
                {sikkerhetstiltak.map((sikkerhetstiltak, index) => (
                    <div key={index}>
                        <EtikettGraa>
                            Gyldig: {hentPeriodeTekst(sikkerhetstiltak.gyldigFraOgMed, sikkerhetstiltak.gyldigTilOgMed)}
                        </EtikettGraa>
                        <Normaltekst>{sikkerhetstiltak.beskrivelse}</Normaltekst>
                    </div>
                ))}
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

export default Sikkerhetstiltak;
