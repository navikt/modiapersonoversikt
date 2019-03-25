import * as React from 'react';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import DescriptionList, { DescriptionListEntries } from '../../../../../components/DescriptionList';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import { formaterDato, periodeEllerNull } from '../../../../../utils/stringFormatting';
import { YtelserKeys } from '../ytelserKeys';
import { Sykepenger } from '../../../../../models/ytelse/sykepenger';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import { Periode } from '../../../../../models/periode';
import { getSykemeldingPeriode } from './sykepengerUtils';
import Sykepengertilfellet from './Sykepengertilfellet';

interface Props {
    sykepenger: Sykepenger;
    sykepengenr: number;
}

const Padding = styled.div`
    margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
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
    const sykemeldingPeriode: Periode = getSykemeldingPeriode(sykepenger);
    const sykemeldingEntries: DescriptionListEntries = {
        Periode: periodeEllerNull(sykemeldingPeriode)
    };
    return (
        <YtelserPeriode tittel={`Periode ${sykepengenr} - ${formaterDato(sykepenger.sykmeldtFom)}`}>
            <Flex>
                <Liten>
                    <Padding>
                        <Sykepengertilfellet sykepenger={sykepenger} />
                    </Padding>
                    <Padding>
                        <YtelserInfoGruppe tittel="Sykemelding">
                            <DescriptionList entries={sykemeldingEntries} />
                        </YtelserInfoGruppe>
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
