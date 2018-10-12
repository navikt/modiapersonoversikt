import * as React from 'react';
import NavDatovelger, { Avgrensninger } from 'nav-datovelger';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { formaterTilISO8601Date } from '../../utils/dateUtils';
import { Feilmelding } from '../../utils/Feilmelding';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import * as moment from 'moment';

interface Props {
    dato: Date | undefined;
    id: string;
    onChange: (dato: Date) => void;
    feil?: SkjemaelementFeil;
    children: string;
    innenEtÅr?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > *:not(:first-child) {
    margin-bottom: .5rem;
    margin-left: .5rem;
  }
`;

export function tilPeriode(gyldigTil: Date) {
    return {
        fra: formaterTilISO8601Date(new Date()),
        til: formaterTilISO8601Date(gyldigTil)
    };
}

const omEtÅr = moment().add(1, 'year').toDate();
const iMorgen = moment().add(1, 'day').toDate();
const omEnUke = moment().add(1, 'week').toDate();
const omTreMåneder = moment().add(3, 'month').toDate();

const avgrensninger: Avgrensninger = {
    minDato: iMorgen,
    maksDato: omEtÅr
};

export default function Datovelger({dato, id, onChange, feil, children, innenEtÅr}: Props) {

    function handleHurtigvalg(newDate: Date) {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onChange(newDate);
        };
    }

    return (
        <>
            <label htmlFor={id} className={'skjemaelement__label'}>{children}</label>
            <Wrapper>
                <NavDatovelger
                    dato={dato}
                    id={id}
                    avgrensninger={innenEtÅr ? avgrensninger : undefined}
                    onChange={onChange}
                />
                <KnappBase type="flat" mini={true} onClick={handleHurtigvalg(omEnUke)}>Om en uke</KnappBase>
                <KnappBase type="flat" mini={true} onClick={handleHurtigvalg(omTreMåneder)}>Om tre måneder</KnappBase>
                <KnappBase type="flat" mini={true} onClick={handleHurtigvalg(omEtÅr)}>Om et år</KnappBase>
            </Wrapper>
            <Feilmelding feil={feil}/>
        </>
    );
}
