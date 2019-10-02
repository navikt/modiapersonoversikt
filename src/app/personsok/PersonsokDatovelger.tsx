import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import styled from 'styled-components';
import { useState } from 'react';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import { PersonsokSkjemaProps } from './PersonsokSkjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import usePosition from '../../utils/hooks/use-position';

const DatovelgerStyle = styled.div<{ top: number; left: number }>`
    margin-right: 0.5em;
    margin-bottom: 1em;
    line-height: ${pxToRem(22)};

    .nav-datovelger__kalenderPortal {
        position: fixed;
        top: ${props => props.top}px;
        left: ${props => props.left}px;
        transform: translateX(-85%);
    }
`;

const DatolabelStyle = styled.label`
    margin-bottom: 0.5em;
`;

function PersonsokDatovelger(props: { form: PersonsokSkjemaProps }) {
    const fraRef = React.createRef<HTMLDivElement>();
    const tilRef = React.createRef<HTMLDivElement>();

    const dropdownFraPosition = usePosition(fraRef);
    const dropdownTilPosition = usePosition(tilRef);

    const [tilAvgrensing, settTilAvgrensing] = useState<DatovelgerAvgrensninger | undefined>(undefined);
    const datoChanger = (dato?: string) => {
        props.form.actions.settFodselsdatoFra(dato);
        settTilAvgrensing({ minDato: dato });
    };

    const dropdownFraTopCoordinates = dropdownFraPosition.top + dropdownFraPosition.height;
    const dropdownFraLeftCoordinates = dropdownFraPosition.left + dropdownFraPosition.width;

    const dropdownTilTopCoordinates = dropdownTilPosition.top + dropdownTilPosition.height;
    const dropdownTilLeftCoordinates = dropdownTilPosition.left + dropdownTilPosition.width;

    return (
        <>
            <DatovelgerStyle ref={fraRef} top={dropdownFraTopCoordinates} left={dropdownFraLeftCoordinates}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-fra">
                    <Normaltekst>Fødselsdato fra</Normaltekst>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                    visÅrVelger={true}
                    valgtDato={props.form.state.fodselsdatoFra}
                    onChange={datoChanger}
                    id="personsok-datovelger-fra"
                />
            </DatovelgerStyle>
            <DatovelgerStyle ref={tilRef} top={dropdownTilTopCoordinates} left={dropdownTilLeftCoordinates}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-til">
                    <Normaltekst>Fødselsdato til</Normaltekst>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-til', name: 'Fødselsdato til dato' }}
                    visÅrVelger={true}
                    valgtDato={props.form.state.fodselsdatoTil}
                    onChange={dato => props.form.actions.settFodselsdatoTil(dato)}
                    id="personsok-datovelger-til"
                    avgrensninger={tilAvgrensing}
                />
            </DatovelgerStyle>
        </>
    );
}

export default PersonsokDatovelger;
