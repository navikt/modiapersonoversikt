import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import theme from '../../../../styles/personOversiktTheme';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Knapp } from 'nav-frontend-knapper';
import { isLoading, isReloading, RestReducer } from '../../../../redux/restReducers/restReducer';
import { DetaljertOppfolging } from '../../../../models/oppfolging';

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

export interface FraTilDato {
    fra: Date;
    til: Date;
}

interface Props {
    onChange: (change: Partial<FraTilDato>) => void;
    hentOppfølging: () => void;
    valgtPeriode: FraTilDato;
    oppfølgingReducer: RestReducer<DetaljertOppfolging>;
}

function datoInputs(props: Props) {
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
                        onChange={dato => props.onChange({ fra: dato })}
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
                        onChange={dato => props.onChange({ til: dato })}
                        id="utbetalinger-datovelger-til"
                        disabled={oppfølgingLastes}
                    />
                </div>
            </DatoVelgerWrapper>
            <KnappWrapper>
                <Knapp
                    onClick={props.hentOppfølging}
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
            <TittelWrapper tabIndex={-1}>
                <Undertittel>Oppfølging og ytelser vises for perioden:</Undertittel>
            </TittelWrapper>
            {datoInputs(props)}
        </DatoKomponentWrapper>
    );
}

export default OppfolgingDatoPanel;
