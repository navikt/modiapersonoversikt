import * as React from 'react';
import styled from 'styled-components/macro';
import { Undertittel } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Knapp } from 'nav-frontend-knapper';
import { isLoading, isReloading, RestResource } from '../../../../rest/utils/restResource';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { VisOppfolgingFraTilDato } from '../../../../redux/oppfolging/types';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { settValgtPeriode } from '../../../../redux/oppfolging/actions';
import { connect } from 'react-redux';
import { reloadOppfolingActionCreator } from '../../../../redux/restReducers/oppfolging';
import { formaterDato, formaterTilISO8601Date } from '../../../../utils/string-utils';
import moment from 'moment';
import { isValidDate } from '../../../../utils/date-utils';
import { loggEvent } from '../../../../utils/logger/frontendLogger';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import { Datepicker, isISODateString } from 'nav-datovelger';

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

interface StateProps {
    oppfølgingResource: RestResource<DetaljertOppfolging>;
    valgtPeriode: VisOppfolgingFraTilDato;
}

interface DispatchProps {
    settValgtPeriode: (change: Partial<VisOppfolgingFraTilDato>) => void;
    reloadDetaljertOppfolging: () => void;
}

type Props = DispatchProps & StateProps;

const tidligsteDato = () =>
    moment()
        .subtract(10, 'year')
        .startOf('day')
        .toDate();

const senesteDato = () =>
    moment()
        .add(1, 'year')
        .endOf('day')
        .toDate();

function getDatoFeilmelding(fra: Date, til: Date) {
    if (fra > til) {
        return <SkjemaelementFeilmelding>Fra-dato kan ikke være senere enn til-dato</SkjemaelementFeilmelding>;
    }
    if (til > senesteDato()) {
        return (
            <SkjemaelementFeilmelding>
                Du kan ikke velge dato etter {formaterDato(senesteDato())}
            </SkjemaelementFeilmelding>
        );
    }
    if (fra < tidligsteDato()) {
        return (
            <SkjemaelementFeilmelding>
                Du kan ikke velge en dato før {formaterDato(tidligsteDato())}
            </SkjemaelementFeilmelding>
        );
    }
    if (!isValidDate(fra) || !isValidDate(til)) {
        return <SkjemaelementFeilmelding>Du må velge gyldige datoer</SkjemaelementFeilmelding>;
    }
    return null;
}

function DatoInputs(props: Props) {
    const oppfølgingLastes = isLoading(props.oppfølgingResource) || isReloading(props.oppfølgingResource);
    const fra = props.valgtPeriode.fra;
    const til = props.valgtPeriode.til;
    const periodeFeilmelding = getDatoFeilmelding(fra, til);
    const avgrensninger = {
        minDate: formaterTilISO8601Date(tidligsteDato()),
        maxDate: formaterTilISO8601Date(senesteDato())
    };

    const onClickHandler = () => {
        if (oppfølgingLastes || !isValidDate(fra) || !isValidDate(til)) {
            return;
        }
        loggEvent('SøkNyPeriode', 'Oppfølging');
        props.reloadDetaljertOppfolging();
    };

    return (
        <DatoVelgerWrapper>
            <label htmlFor="oppfolging-datovelger-fra">Fra:</label>
            <Datepicker
                locale={'nb'}
                inputId="oppfolging-datovelger-fra"
                value={formaterTilISO8601Date(fra)}
                onChange={dato => props.settValgtPeriode({ fra: moment(dato).toDate() })}
                inputProps={{
                    name: 'Fra dato',
                    'aria-invalid':
                        formaterTilISO8601Date(fra) !== '' && isISODateString(formaterTilISO8601Date(fra)) === false
                }}
                showYearSelector={true}
                limitations={avgrensninger}
            />
            <label htmlFor="oppfolging-datovelger-til">Til:</label>
            <Datepicker
                locale={'nb'}
                inputId="oppfolging-datovelger-til"
                value={formaterTilISO8601Date(til)}
                onChange={dato => props.settValgtPeriode({ til: moment(dato).toDate() })}
                inputProps={{
                    name: 'Til dato',
                    'aria-invalid':
                        formaterTilISO8601Date(til) !== '' && isISODateString(formaterTilISO8601Date(til)) === false
                }}
                showYearSelector={true}
                limitations={avgrensninger}
            />
            {periodeFeilmelding}
            <Knapp onClick={onClickHandler} spinner={oppfølgingLastes} htmlType="button">
                Søk
            </Knapp>
        </DatoVelgerWrapper>
    );
}

function OppfolgingDatoPanel(props: Props) {
    const headerId = useRef(guid());

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                <TittelWrapper>
                    <Undertittel id={headerId.current}>Oppfølging og ytelser vises for perioden:</Undertittel>
                </TittelWrapper>
                <DatoInputs {...props} />
            </article>
        </StyledPanel>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        oppfølgingResource: state.restResources.oppfolging,
        valgtPeriode: state.oppfolging.valgtPeriode
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        settValgtPeriode: (change: Partial<VisOppfolgingFraTilDato>) => dispatch(settValgtPeriode(change)),
        reloadDetaljertOppfolging: () => dispatch(reloadOppfolingActionCreator)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingDatoPanel);
