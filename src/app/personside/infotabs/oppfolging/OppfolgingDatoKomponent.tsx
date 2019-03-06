import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import theme from '../../../../styles/personOversiktTheme';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Knapp } from 'nav-frontend-knapper';
import moment from 'moment';

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
    onChange: (change: FraTilDato) => void;
    hentOppfølging: () => void;
    valgtPeriode: FraTilDato;
}

function onDatoChange(props: Props, dato: Partial<FraTilDato>) {
    const newPeriode: FraTilDato = {
        fra: dato.fra && moment(dato.fra).isValid() ? dato.fra : new Date(props.valgtPeriode.fra),
        til: dato.til && moment(dato.til).isValid() ? dato.til : new Date(props.valgtPeriode.til)
    };

    props.onChange(newPeriode);
}

function datoInputs(props: Props) {
    return (
        <>
            <DatoVelgerWrapper>
                <div>
                    <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
                    <Datovelger
                        input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                        visÅrVelger={true}
                        dato={props.valgtPeriode.fra}
                        onChange={dato => onDatoChange(props, { fra: dato })}
                        id="utbetalinger-datovelger-fra"
                    />
                </div>
                <div>
                    <label htmlFor="utbetalinger-datovelger-til">Til:</label>
                    <Datovelger
                        input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                        visÅrVelger={true}
                        dato={props.valgtPeriode.til}
                        onChange={dato => onDatoChange(props, { til: dato })}
                        id="utbetalinger-datovelger-til"
                    />
                </div>
            </DatoVelgerWrapper>
            <KnappWrapper>
                <Knapp onClick={props.hentOppfølging} htmlType="button">
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
