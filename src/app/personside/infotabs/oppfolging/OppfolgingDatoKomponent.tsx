import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import theme from '../../../../styles/personOversiktTheme';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Knapp } from 'nav-frontend-knapper';
import { isLoading, isReloading, RestResource } from '../../../../rest/utils/restResource';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { VisOppfolgingFraTilDato } from '../../../../redux/oppfolging/types';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { settValgtPeriode } from '../../../../redux/oppfolging/actions';
import { connect } from 'react-redux';
import { reloadOppfolingActionCreator } from '../../../../redux/restReducers/oppfolging';
import { Avgrensninger } from 'nav-datovelger';
import { Feilmelding } from '../../../../utils/Feilmelding';
import { formaterDato } from '../../../../utils/stringFormatting';
import moment from 'moment';

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
        return <Feilmelding feil={{ feilmelding: 'Fra-dato kan ikke være senere enn til-dato' }} />;
    }
    if (til > senesteDato()) {
        return <Feilmelding feil={{ feilmelding: 'Du kan ikke velge dato etter ' + formaterDato(senesteDato()) }} />;
    }
    if (fra < tidligsteDato()) {
        return (
            <Feilmelding
                feil={{
                    feilmelding: 'Du kan ikke velge en dato før ' + formaterDato(tidligsteDato())
                }}
            />
        );
    }
    return null;
}

function DatoInputs(props: Props) {
    const oppfølgingLastes = isLoading(props.oppfølgingResource) || isReloading(props.oppfølgingResource);
    const fra = props.valgtPeriode.fra;
    const til = props.valgtPeriode.til;
    const periodeFeilmelding = getDatoFeilmelding(fra, til);
    const avgrensninger: Avgrensninger = {
        minDato: tidligsteDato(),
        maksDato: senesteDato()
    };

    return (
        <DatoVelgerWrapper>
            <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                visÅrVelger={true}
                dato={fra}
                onChange={dato => props.settValgtPeriode({ fra: dato })}
                id="utbetalinger-datovelger-fra"
                avgrensninger={avgrensninger}
            />
            <label htmlFor="utbetalinger-datovelger-til">Til:</label>
            <Datovelger
                input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                visÅrVelger={true}
                dato={til}
                onChange={dato => props.settValgtPeriode({ til: dato })}
                id="utbetalinger-datovelger-til"
                avgrensninger={avgrensninger}
            />
            {periodeFeilmelding}
            <Knapp
                onClick={!oppfølgingLastes ? props.reloadDetaljertOppfolging : () => null}
                spinner={oppfølgingLastes}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OppfolgingDatoPanel);
