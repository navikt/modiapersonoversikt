import * as React from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { FraTilDato, PeriodeOptions, PeriodeValg } from '../../../../../redux/utbetalinger/types';
import styled from 'styled-components';
import EgendefinertDatoInputs from './EgendefinertDatoInputs';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';

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
    const [radioValg, setRadioValg] = useState<PeriodeValg>(PeriodeValg.SISTE_30_DAGER);
    const [periode, setPeriode] = useState<FraTilDato>();

    const onPeriodChange = (periodeValg: PeriodeValg) => {
        setRadioValg(periodeValg);
        const fraTilDato = getFraDateFromPeriod(periodeValg);
        setPeriode(fraTilDato);
        props.updatePeriod({ ...props.periode, radioValg: periodeValg });
    };

    const onFraTilDatoChange = (val: FraTilDato) => {
        setPeriode(val);
        props.updatePeriod({ ...props.periode, egendefinertPeriode: val });
    };

    const getFraDateFromPeriod = (periodeValg: PeriodeValg): FraTilDato => {
        switch (periodeValg) {
            case PeriodeValg.INNEVERENDE_AR:
                return { fra: toIsoDateString(dayjs().startOf('year')), til: toIsoDateString(dayjs().endOf('year')) };
            case PeriodeValg.I_FJOR:
                return {
                    fra: toIsoDateString(dayjs().subtract(1, 'year').startOf('year')),
                    til: toIsoDateString(dayjs().subtract(1, 'year').endOf('year'))
                };
            case PeriodeValg.EGENDEFINERT:
            case PeriodeValg.SISTE_30_DAGER:
            default:
                return {
                    fra: toIsoDateString(dayjs().subtract(30, 'day').startOf('day')),
                    til: toIsoDateString(dayjs().endOf('day'))
                };
        }
    };

    const toIsoDateString = (date: Dayjs) => date.format(ISO_DATE_STRING_FORMAT);

    const radios = Object.keys(PeriodeValg).map((key) => {
        const label = PeriodeValg[key];
        const checked = radioValg === label;
        return (
            <RadioWrapper key={label}>
                <Radio
                    label={label}
                    checked={checked}
                    onChange={() => onPeriodChange(PeriodeValg[key])}
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
                <EgendefinertDatoInputs filter={periode} updateFraTilDato={onFraTilDatoChange} />
            )}
        </InputPanel>
    );
}

export default FiltreringPeriode;
