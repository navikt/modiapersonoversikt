import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import styled from 'styled-components';
import { RefObject, useEffect, useState } from 'react';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import { PersonsokSkjemaProps } from './PersonsokSkjema';

const DatovelgerStyle = styled.div<DatovelgerPosition>`
    flex-direction: column;
    padding-right: 0.5em;
    margin-bottom: 1em;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.375rem;
    font-weight: 400;

    .nav-datovelger__kalenderPortal {
        position: fixed;
        top: ${props => props.top}px;
        left: ${props => props.left}px;
        transform: translateX(-85%);
    }
`;

const DatolabelStyle = styled.div`
    margin-bottom: 0.5em;
`;

interface DatovelgerPosition {
    top: number;
    left: number;
}

function beregPosition(current: HTMLDivElement): DatovelgerPosition {
    const rect = current.getBoundingClientRect();
    return {
        top: rect.top + rect.height,
        left: rect.left + rect.width
    };
}

function usePosition(ref: RefObject<HTMLDivElement>) {
    const [positionDatovelger, setPositionDatovelger] = useState<DatovelgerPosition>({ top: 0, left: 0 });
    useEffect(() => {
        if (ref.current && ref.current) {
            setPositionDatovelger(beregPosition(ref.current));
        }
    }, [ref]);

    return positionDatovelger;
}

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

    return (
        <>
            <DatovelgerStyle ref={fraRef} {...dropdownFraPosition}>
                <DatolabelStyle>
                    <label htmlFor="personsok-datovelger-fra">Fødselsdato fra:</label>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                    visÅrVelger={true}
                    valgtDato={props.form.state.fodselsdatoFra}
                    onChange={datoChanger}
                    id="personsok-datovelger-fra"
                />
            </DatovelgerStyle>
            <DatovelgerStyle ref={tilRef} {...dropdownTilPosition}>
                <DatolabelStyle>
                    <label htmlFor="personsok-datovelger-til">Fødselsdato til:</label>
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
