import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import { Temagruppe, temagruppeTekst } from '../../../../models/temagrupper';
import { Select, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    setTema: (tema?: Temagruppe) => void;
    valgtTema?: Temagruppe;
    visFeilmelding?: boolean;
    temavalg: Temagruppe[];
}

const StyledSelect = styled(Select)`
    label {
        ${theme.visuallyHidden}
    }
`;

function Temavelger(props: Props) {
    let selectRef: HTMLSelectElement | null = null;

    useEffect(() => {
        if (props.visFeilmelding) {
            selectRef && selectRef.focus();
        }
    }, [selectRef, props.visFeilmelding]);

    const velgTemaHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        const tema = props.temavalg.find((tema) => tema === event.target.value);
        props.setTema(tema);
    };
    return (
        <SkjemaGruppe
            feil={
                props.visFeilmelding ? (
                    <SkjemaelementFeilmelding>Du må velge temagruppe</SkjemaelementFeilmelding>
                ) : undefined
            }
        >
            <StyledSelect
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
                selectRef={(ref) => (selectRef = ref)}
                label="Tema"
                onChange={velgTemaHandler}
                value={props.valgtTema ? props.valgtTema : ''}
            >
                <option value="" disabled>
                    Velg temagruppe
                </option>
                {props.temavalg.map((temagruppe) => (
                    <option key={temagruppe} value={temagruppe}>
                        {temagruppeTekst(temagruppe)}
                    </option>
                ))}
            </StyledSelect>
        </SkjemaGruppe>
    );
}

export default Temavelger;
