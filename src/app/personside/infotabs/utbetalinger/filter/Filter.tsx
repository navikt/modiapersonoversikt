import * as React from 'react';
import { Radio } from 'nav-frontend-skjema';
import { EtikettLiten, Undertittel } from 'nav-frontend-typografi';
import { UtbetalingerResponse } from '../../../../../models/utbetalinger';
import { isLoaded, isLoading, isReloading, RestResource } from '../../../../../redux/restReducers/restResource';
import UtbetaltTilValg from './UtbetaltTilValg';
import YtelseValg from './YtelseValg';
import { restoreScroll } from '../../../../../utils/restoreScroll';
import { Knapp } from 'nav-frontend-knapper';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { connect } from 'react-redux';
import { oppdaterFilter } from '../../../../../redux/utbetalinger/actions';
import { UtbetalingFilterState, PeriodeValg } from '../../../../../redux/utbetalinger/types';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import EgendefinertDatoInputs from './EgendefinertDatoInputs';

interface OwnProps {
    hentUtbetalinger: () => void;
}

interface StateProps {
    filter: UtbetalingFilterState;
    fødselsnummer: string;
    utbetalingerResource: RestResource<UtbetalingerResponse>;
}

interface DispatchProps {
    updateFilter: (change: Partial<UtbetalingFilterState>) => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const FiltreringsPanel = styled.nav`
    ${theme.hvittPanel};
    padding: ${theme.margin.px20};
    margin-bottom: ${theme.margin.layout};
`;

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
`;

const KnappWrapper = styled.div`
    margin-top: 1rem;
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

const WrapOnSmallScreen = styled.div`
    @media (max-width: ${theme.media.utbetalinger}) {
        display: flex;
        flex-wrap: wrap;
        > * {
            flex-grow: 1;
            flex-basis: 30%;
        }
        > *:not(:last-child) {
            margin-right: 1rem;
        }
    }
`;

function onRadioChange(props: Props, key: PeriodeValg) {
    props.updateFilter({
        periode: {
            ...props.filter.periode,
            radioValg: key
        }
    });
}

function visCheckbokser(utbetalingerResponse: UtbetalingerResponse): boolean {
    return utbetalingerResponse.utbetalinger && utbetalingerResponse.utbetalinger.length > 0;
}

function Filtrering(props: Props) {
    const radios = Object.keys(PeriodeValg).map(key => {
        const label = PeriodeValg[key];
        const checked = props.filter.periode.radioValg === label;
        return (
            <Radio
                key={label}
                label={label}
                checked={checked}
                onChange={() => onRadioChange(props, PeriodeValg[key])}
                name="FiltreringsvalgGruppe"
            />
        );
    });

    const visSpinner = isLoading(props.utbetalingerResource) || isReloading(props.utbetalingerResource);
    const checkBokser = isLoaded(props.utbetalingerResource) && visCheckbokser(props.utbetalingerResource.data) && (
        <>
            <InputPanel>
                <EtikettLiten>Utbetaling til</EtikettLiten>
                <UtbetaltTilValg
                    utbetalinger={props.utbetalingerResource.data.utbetalinger}
                    onChange={props.updateFilter}
                    filterState={props.filter}
                />
            </InputPanel>
            <InputPanel>
                <EtikettLiten>Velg ytelse</EtikettLiten>
                <YtelseValg
                    onChange={props.updateFilter}
                    filterState={props.filter}
                    utbetalinger={props.utbetalingerResource.data.utbetalinger}
                />
            </InputPanel>
        </>
    );
    const hentUtbetalingerPanel = (
        <InputPanel>
            <FieldSet>
                <EtikettLiten tag="legend">Velg periode</EtikettLiten>
                {radios}
            </FieldSet>
            {props.filter.periode.radioValg === PeriodeValg.EGENDEFINERT && (
                <EgendefinertDatoInputs filter={props.filter} updateFilter={props.updateFilter} />
            )}
            <KnappWrapper>
                <Knapp onClick={props.hentUtbetalinger} spinner={visSpinner} htmlType="button">
                    Hent utbetalinger
                </Knapp>
            </KnappWrapper>
        </InputPanel>
    );
    return (
        <FiltreringsPanel onClick={restoreScroll} aria-label="Filtrering utbetalinger">
            <Undertittel>Filtrering</Undertittel>

            <WrapOnSmallScreen>
                {hentUtbetalingerPanel}
                {checkBokser}
            </WrapOnSmallScreen>
        </FiltreringsPanel>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        utbetalingerResource: state.restResources.utbetalinger,
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        filter: state.utbetalinger.filter
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        updateFilter: (change: Partial<UtbetalingFilterState>) => dispatch(oppdaterFilter(change))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filtrering);
