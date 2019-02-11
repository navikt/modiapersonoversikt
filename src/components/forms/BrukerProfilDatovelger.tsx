import * as React from 'react';
import { Avgrensninger } from 'nav-datovelger';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { formaterTilISO8601Date } from '../../utils/dateUtils';
import { Feilmelding } from '../../utils/Feilmelding';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import moment from 'moment';
import { loggEvent } from '../../utils/frontendLogger';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';

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

export default function BrukerProfilDatovelger({dato, id, onChange, feil, children, innenEtÅr}: Props) {

    function handleomEtÅrHurtigvalg(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        onChange(omEtÅr);
        loggEvent('Hurtigvalg', 'Datovelger', {type: 'Om et år'});
    }

    return (
        <>
            <label htmlFor={id} className={'skjemaelement__label'}>{children}</label>
            <Wrapper>
                <Datovelger
                    input={{id: id, name: 'Datovelger'}}
                    visÅrVelger={true}
                    dato={dato}
                    onChange={onChange}
                    id={id}
                    avgrensninger={innenEtÅr ? avgrensninger : undefined}
                />
                <KnappBase type="standard" mini={true} onClick={handleomEtÅrHurtigvalg}>Om et år</KnappBase>
            </Wrapper>
            <Feilmelding feil={feil}/>
        </>
    );
}
