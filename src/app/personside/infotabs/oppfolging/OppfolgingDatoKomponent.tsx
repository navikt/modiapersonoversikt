import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import theme from '../../../../styles/personOversiktTheme';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Knapp } from 'nav-frontend-knapper';

const Wrapper = styled.div`
    ${theme.hvittPanel};
    padding: ${theme.margin.px10} ${theme.margin.px10};
`;

const TittleWrapper = styled.span`
    &:focus {
        outline: none;
    }
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

interface Props {}

function onDatoChange(props: Props, dato: Partial<FraTilDato>) {}

function DatoInputs(props: Props) {
    const periode: FraTilDato = {
        fra: new Date(),
        til: new Date()
    };

    return (
        <>
            <DatoVelgerWrapper>
                <div>
                    <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
                    <Datovelger
                        input={{ id: 'utbetalinger-datovelger-fra', name: 'Fra dato' }}
                        visÅrVelger={true}
                        dato={periode.fra}
                        onChange={dato => onDatoChange(props, { fra: dato })}
                        id="utbetalinger-datovelger-fra"
                    />
                </div>
                <div>
                    <label htmlFor="utbetalinger-datovelger-til">Til:</label>
                    <Datovelger
                        input={{ id: 'utbetalinger-datovelger-til', name: 'Til dato' }}
                        visÅrVelger={true}
                        dato={periode.til}
                        onChange={dato => onDatoChange(props, { til: dato })}
                        id="utbetalinger-datovelger-til"
                    />
                </div>
            </DatoVelgerWrapper>
            <KnappWrapper>
                <Knapp htmlType="button">Søk</Knapp>
            </KnappWrapper>
        </>
    );
}

function OppfolgingDatoPanel() {
    return (
        <Wrapper>
            <TittleWrapper tabIndex={-1}>
                <Undertittel>Oppfølging og ytelser vises for perioden:</Undertittel>
                <DatoInputs />
            </TittleWrapper>
        </Wrapper>
    );
}

export default OppfolgingDatoPanel;
