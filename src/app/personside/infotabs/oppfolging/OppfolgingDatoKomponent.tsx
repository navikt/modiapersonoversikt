import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import theme from '../../../../styles/personOversiktTheme';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Knapp } from 'nav-frontend-knapper';
import { DeprecatedRestResource, isLoading, isReloading } from '../../../../redux/restReducers/deprecatedRestResource';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { VisOppfolgingFraTilDato } from '../../../../redux/oppfolging/types';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { reloadDetaljertOppfolging } from '../../../../redux/restReducers/oppfolging';
import { settValgtPeriode } from '../../../../redux/oppfolging/actions';
import { connect } from 'react-redux';

const DatoVelgerWrapper = styled.div`
    > * {
        margin-bottom: 1rem;
    }
`;

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

interface StateProps {
    oppfølgingResource: DeprecatedRestResource<DetaljertOppfolging>;
    valgtPeriode: VisOppfolgingFraTilDato;
    fødselsnummer: string;
}

interface DispatchProps {
    settValgtPeriode: (change: Partial<VisOppfolgingFraTilDato>) => void;
    reloadDetaljertOppfølging: (fødselsnummer: string, startDato: Date, sluttDato: Date) => void;
}

type Props = DispatchProps & StateProps;

function DatoInputs(props: Props) {
    const oppfølgingLastes = isLoading(props.oppfølgingResource) || isReloading(props.oppfølgingResource);

    return (
        <DatoVelgerWrapper>
            <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                visÅrVelger={true}
                dato={props.valgtPeriode.fra}
                onChange={dato => props.settValgtPeriode({ fra: dato })}
                id="utbetalinger-datovelger-fra"
                disabled={oppfølgingLastes}
            />
            <label htmlFor="utbetalinger-datovelger-til">Til:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                visÅrVelger={true}
                dato={props.valgtPeriode.til}
                onChange={dato => props.settValgtPeriode({ til: dato })}
                id="utbetalinger-datovelger-til"
                disabled={oppfølgingLastes}
            />
            <Knapp
                onClick={() =>
                    props.reloadDetaljertOppfølging(props.fødselsnummer, props.valgtPeriode.fra, props.valgtPeriode.til)
                }
                spinner={oppfølgingLastes}
                aria-disabled={oppfølgingLastes}
                htmlType="button"
            >
                Søk
            </Knapp>
        </DatoVelgerWrapper>
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
        oppfølgingResource: state.restResources.oppfolging,
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
