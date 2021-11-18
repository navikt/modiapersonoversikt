import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import SikkerhetsTiltakIkon from '../../../../../svg/Sikkerhetstiltak';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';
import { Sikkerhetstiltak as SikkerhetstiltakInterface } from '../../PersondataDomain';
import GyldighetsPeriode from '../GyldighetsPeriode';

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
                {sikkerhetstiltak.map((sikkerhetstiltak, index) => {
                    return (
                        <div key={index}>
                            <GyldighetsPeriode gyldighetsPeriode={sikkerhetstiltak.gyldighetsPeriode} />
                            <Normaltekst>{sikkerhetstiltak.beskrivelse}</Normaltekst>
                        </div>
                    );
                })}
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

export default Sikkerhetstiltak;
