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
  align-items: center;
  > *:not(:first-child) {
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

const avgrensninger: Avgrensninger = {
    minDato: iMorgen,
    maksDato: omEtÅr
};

export default function Datovelger({dato, id, onChange, feil, children, innenEtÅr}: Props) {

    function handleomEtÅrHurtigvalg(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        onChange(omEtÅr);
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
                <KnappBase type="standard" mini={true} onClick={handleomEtÅrHurtigvalg}>Om et år</KnappBase>
            </Wrapper>
            <Feilmelding feil={feil}/>
        </>
    );
}
