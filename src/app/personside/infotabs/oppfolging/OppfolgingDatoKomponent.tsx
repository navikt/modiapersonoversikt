import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import theme from '../../../../styles/personOversiktTheme';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Knapp } from 'nav-frontend-knapper';
import { isLoading, isReloading, RestReducer } from '../../../../redux/restReducers/restReducer';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { VisOppfolgingFraTilDato } from '../../../../redux/oppfolging/types';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { reloadDetaljertOppfolging } from '../../../../redux/restReducers/oppfolging';
import { settValgtPeriode } from '../../../../redux/oppfolging/actions';
import { connect } from 'react-redux';

const DatoKomponentWrapper = styled.div`
    ${theme.hvittPanel};
    padding: ${theme.margin.px20};
`;

const TittelWrapper = styled.div`
    &:focus {
        outline: none;
    }
    margin-bottom: ${theme.margin.layout};
`;

const DatoVelgerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
    > *:first-child {
        margin-right: 0.5rem;
    }
`;

const KnappWrapper = styled.div`
    margin-top: 1rem;
`;

interface StateProps {
    oppfølgingReducer: RestReducer<DetaljertOppfolging>;
    valgtPeriode: VisOppfolgingFraTilDato;
    fødselsnummer: string;
}

interface DispatchProps {
    settValgtPeriode: (change: Partial<VisOppfolgingFraTilDato>) => void;
    reloadDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) => void;
}

type Props = DispatchProps & StateProps;

function DatoInputs(props: Props) {
    const oppfølgingLastes = isLoading(props.oppfølgingReducer) || isReloading(props.oppfølgingReducer);

    return (
        <>
            <DatoVelgerWrapper>
                <div>
                    <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
                    <Datovelger
                        input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                        visÅrVelger={true}
                        dato={props.valgtPeriode.fra}
                        onChange={dato => props.settValgtPeriode({ fra: dato })}
                        id="utbetalinger-datovelger-fra"
                        disabled={oppfølgingLastes}
                    />
                </div>
                <div>
                    <label htmlFor="utbetalinger-datovelger-til">Til:</label>
                    <Datovelger
                        input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                        visÅrVelger={true}
                        dato={props.valgtPeriode.til}
                        onChange={dato => props.settValgtPeriode({ til: dato })}
                        id="utbetalinger-datovelger-til"
                        disabled={oppfølgingLastes}
                    />
                </div>
            </DatoVelgerWrapper>
            <KnappWrapper>
                <Knapp
                    onClick={() =>
                        props.reloadDetaljertOppfølging(
                            props.fødselsnummer,
                            props.valgtPeriode.fra,
                            props.valgtPeriode.til
                        )
                    }
                    spinner={oppfølgingLastes}
                    aria-disabled={oppfølgingLastes}
                    htmlType="button"
                >
                    Søk
                </Knapp>
            </KnappWrapper>
        </>
    );
}

function OppfolgingDatoPanel(props: Props) {
    return (
        <DatoKomponentWrapper>
            <TittelWrapper>
                <Undertittel>Oppfølging og ytelser vises for perioden:</Undertittel>
            </TittelWrapper>
            <DatoInputs {...props} />
        </DatoKomponentWrapper>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        oppfølgingReducer: state.restEndepunkter.oppfolgingReducer,
        valgtPeriode: state.oppfolging.valgtPeriode
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        settValgtPeriode: (change: Partial<VisOppfolgingFraTilDato>) => dispatch(settValgtPeriode(change)),
        reloadDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) =>
            dispatch(reloadDetaljertOppfolging(fødselsnummer, startDato, sluttDato))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OppfolgingDatoPanel);
