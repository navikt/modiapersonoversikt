import { Radio } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { FraTilDato, PeriodeOptions, PeriodeValg } from '../../../../../redux/utbetalinger/types';
import styled from 'styled-components';
import EgendefinertDatoInputs from './EgendefinertDatoInputs';
import { useState } from 'react';
import { getFraDateFromPeriod } from '../utils/utbetalinger-utils';

const InputPanel = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    > *:first-child {
        margin-bottom: 0.5rem;
    }
    > * {
        margin-top: 0.5rem;
    }
    .skjemaelement--horisontal {
        margin-bottom: 0.4rem;
    }
`;

const RadioWrapper = styled.div`
    margin-bottom: 0.5rem;
`;
const FieldSet = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;
    > *:first-child {
        margin-bottom: 0.8rem;
    }
    > *:last-child {
        margin-bottom: 0;
    }
`;

interface FiltreringPeriodeProps {
    periode: PeriodeOptions;
    updatePeriod: (change: PeriodeOptions) => void;
}

function FiltreringPeriode(props: FiltreringPeriodeProps) {
    const [radioValg, setRadioValg] = useState<PeriodeValg>(props.periode.radioValg);
    const [periode, setPeriode] = useState<FraTilDato>(props.periode.egendefinertPeriode);

    const onPeriodChange = (periodeValg: PeriodeValg) => {
        setRadioValg(periodeValg);
        const fraTilDato = getFraDateFromPeriod(periodeValg);
        setPeriode(fraTilDato);
        props.updatePeriod({ ...props.periode, radioValg: periodeValg, egendefinertPeriode: fraTilDato });
    };

    const onFraTilDatoChange = (val: FraTilDato) => {
        setPeriode(val);
        props.updatePeriod({ ...props.periode, egendefinertPeriode: val });
    };

    const radios = Object.keys(PeriodeValg).map((key) => {
        const value = PeriodeValg[key] as PeriodeValg;
        const checked = radioValg === value;
        return (
            <RadioWrapper key={value}>
                <Radio
                    label={value}
                    checked={checked}
                    onChange={() => onPeriodChange(value)}
                    name="FiltreringsvalgGruppe"
                />
            </RadioWrapper>
        );
    });

    return (
        <InputPanel>
            <FieldSet>
                <Element tag="legend">Velg periode</Element>
                {radios}
            </FieldSet>
            {radioValg === PeriodeValg.EGENDEFINERT && (
                <EgendefinertDatoInputs periode={periode} updateFraTilDato={onFraTilDatoChange} />
            )}
        </InputPanel>
    );
}

export default FiltreringPeriode;
