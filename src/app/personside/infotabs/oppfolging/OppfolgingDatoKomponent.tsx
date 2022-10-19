import * as React from 'react';
import styled from 'styled-components/macro';
import { Undertittel } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Knapp } from 'nav-frontend-knapper';
import { settValgtPeriode } from '../../../../redux/oppfolging/actions';
import { useDispatch } from 'react-redux';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import { Datepicker, isISODateString } from 'nav-datovelger';
import { ISO_DATE_STRING_FORMAT, INPUT_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';
import { DatepickerLimitations } from 'nav-datovelger/lib/types';
import dayjs, { Dayjs } from 'dayjs';
import { useAppState } from '../../../../utils/customHooks';
import oppfolgingResource from '../../../../rest/resources/oppfolgingResource';

const DatoVelgerWrapper = styled.div`
    position: relative;
    z-index: 50;
    > * {
        margin-bottom: 1rem;
    }
`;

const StyledPanel = styled(Panel)`
    padding: ${pxToRem(15)};
`;

const TittelWrapper = styled.div`
    &:focus {
        outline: none;
    }
    margin-bottom: ${theme.margin.layout};
`;

const tidligsteDato: Dayjs = dayjs().subtract(10, 'years').startOf('day');
const senesteDato: Dayjs = dayjs().add(1, 'year').endOf('day');

const isoTidligsteDato = tidligsteDato.format(ISO_DATE_STRING_FORMAT);
const isoSenesteDato = senesteDato.format(ISO_DATE_STRING_FORMAT);

const periodeValidering = [
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return !fra.isValid();
        },
        feilmelding: 'Du må velge gyldig fra-dato. Gyldig datoformat er dd.mm.åååå'
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return !til.isValid();
        },
        feilmelding: 'Du må velge gyldig til-dato. Gyldig datoformat er dd.mm.åååå'
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return fra.isAfter(til);
        },
        feilmelding: 'Fra-dato kan ikke være senere enn til-dato'
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return til.isAfter(senesteDato);
        },
        feilmelding: `Du kan ikke velge dato etter ${senesteDato.format(INPUT_DATE_STRING_FORMAT)}`
    },
    {
        erUgyldig(fra: Dayjs, til: Dayjs) {
            return fra.isBefore(tidligsteDato);
        },
        feilmelding: `Du kan ikke velge en dato før ${tidligsteDato.format(INPUT_DATE_STRING_FORMAT)}`
    }
];

function getDatoFeilmelding(fra: string, til: string) {
    const fraDato = dayjs(fra, ISO_DATE_STRING_FORMAT);
    const tilDato = dayjs(til, ISO_DATE_STRING_FORMAT);
    const feilmelding: string | undefined = periodeValidering.find((validering) =>
        validering.erUgyldig(fraDato, tilDato)
    )?.feilmelding;
    if (feilmelding) {
        return <SkjemaelementFeilmelding>{feilmelding}</SkjemaelementFeilmelding>;
    }
    return null;
}

function DatoInputs() {
    const update = oppfolgingResource.useMutation();

    const valgtPeriode = useAppState((appState) => appState.oppfolging.valgtPeriode);
    const fra = valgtPeriode.fra;
    const til = valgtPeriode.til;

    const dispatch = useDispatch();

    const periodeFeilmelding = getDatoFeilmelding(fra, til);
    const avgrensninger: DatepickerLimitations = {
        minDate: isoTidligsteDato,
        maxDate: isoSenesteDato
    };

    const onClickHandler = () => {
        if (update.isLoading || periodeFeilmelding !== null) {
            return;
        }
        loggEvent('SøkNyPeriode', 'Oppfølging');
        update.mutate();
    };

    return (
        <DatoVelgerWrapper>
            <label htmlFor="oppfolging-datovelger-fra">Fra:</label>
            <Datepicker
                locale={'nb'}
                inputId="oppfolging-datovelger-fra"
                value={fra}
                onChange={(dato) => dispatch(settValgtPeriode({ fra: dato }))}
                inputProps={{
                    name: 'Fra dato',
                    'aria-invalid': fra !== '' && isISODateString(fra) === false
                }}
                showYearSelector={true}
                limitations={avgrensninger}
                dayPickerProps={{
                    onMonthChange(dato: Date) {
                        dispatch(
                            settValgtPeriode({
                                fra: dayjs(dato).format(ISO_DATE_STRING_FORMAT)
                            })
                        );
                    }
                }}
            />
            <label htmlFor="oppfolging-datovelger-til">Til:</label>
            <Datepicker
                locale={'nb'}
                inputId="oppfolging-datovelger-til"
                value={til}
                onChange={(dato) => dispatch(settValgtPeriode({ til: dato }))}
                inputProps={{
                    name: 'Til dato',
                    'aria-invalid': til !== '' && isISODateString(til) === false
                }}
                showYearSelector={true}
                limitations={avgrensninger}
                dayPickerProps={{
                    onMonthChange(dato: Date) {
                        dispatch(
                            settValgtPeriode({
                                til: dayjs(dato).format(ISO_DATE_STRING_FORMAT)
                            })
                        );
                    }
                }}
            />
            {periodeFeilmelding}
            <Knapp onClick={onClickHandler} spinner={update.isLoading} htmlType="button">
                Søk
            </Knapp>
        </DatoVelgerWrapper>
    );
}

function OppfolgingDatoPanel() {
    const headerId = useRef(guid());

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                <TittelWrapper>
                    <Undertittel id={headerId.current}>Oppfølging og ytelser vises for perioden:</Undertittel>
                </TittelWrapper>
                <DatoInputs />
            </article>
        </StyledPanel>
    );
}

export default OppfolgingDatoPanel;
