import * as React from 'react';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { YtelserKeys } from '../ytelserKeys';
import { Sykepenger } from '../../../../../models/ytelse/sykepenger';
import Sykepengertilfellet from './Sykepengertilfellet';
import SykemeldingKomponent from './SykemeldingKomponent';

interface Props {
    sykepenger: Sykepenger;
    sykepengenr: number;
}

const Padding = styled.div`
    margin: ${theme.margin.px30};
    > * {
        margin-bottom: 3rem;
    }
`;

const Flex = styled.div`
    display: flex;
`;

const Stor = styled.div`
    flex-basis: 55%;
`;

const Liten = styled.div`
    flex-basis: 45%;
`;

function SykepengerKomponent({ sykepenger, sykepengenr }: Props) {
    return (
        <YtelserPeriode tittel={`Periode ${sykepengenr} - ${formaterDato(sykepenger.sykmeldtFom)}`}>
            <Flex>
                <Liten>
                    <Padding>
                        <Sykepengertilfellet sykepenger={sykepenger} />
                        <SykemeldingKomponent sykmeldinger={sykepenger.sykmeldinger} />
                    </Padding>
                </Liten>
                <Stor>
                    <Utbetalinger
                        kommendeUtbetalinger={sykepenger.kommendeUtbetalinger}
                        ytelsesType={YtelserKeys.Sykepenger}
                    />
                </Stor>
            </Flex>
        </YtelserPeriode>
    );
}

export default SykepengerKomponent;
