import * as React from 'react';
import { Foreldrepengerrettighet } from '../../../../../models/ytelse/foreldrepenger';
import theme from '../../../../../styles/personOversiktTheme';
import { utledMaksDato, utledRettighetFraDato } from './utils';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';
import styled from 'styled-components';
import DescriptionList, { DescriptionListEntry } from '../DescriptionList';
import YtelserBullet from '../YtelserBullet';

interface Props {
    foreldrePenger: Foreldrepengerrettighet;
}

const Wrapper = styled.div`
    margin: 0 ${theme.margin.px20} ${theme.margin.px20};
  > *:not(:first-child) {
    border-top: ${theme.border.skilleDashed};
  }
`;

function Oversikt({foreldrePenger}: Props) {

    const foreldrePengeRetten: DescriptionListEntry = {
        'Foreldrepengetype': foreldrePenger.foreldrepengetype,
        'Dekningsgrad': foreldrePenger.dekningsgrad + '%',
        'Dagsats': 'Ikke implementert',
        'Graderingsdager': 'Ikke implementert',
        'Fedrekvote tilogmed': 'Ikke implementert',
        'Mødrekvote tilogmed': 'Ikke implementert',
        'Rettighet fra dato': datoVerbose(utledRettighetFraDato(foreldrePenger)).sammensatt,
        'Restdager': foreldrePenger.restDager,
        'Maksdato': utledMaksDato(foreldrePenger),
        'Arbeidskategori': 'Ikke implementert'
    };

    const barnet: DescriptionListEntry = {
        'Termindato': foreldrePenger.rettighetFom && datoVerbose(foreldrePenger.rettighetFom).sammensatt,
        'Fødselsdato': foreldrePenger.barnetsFødselsdato && datoVerbose(foreldrePenger.barnetsFødselsdato).sammensatt,
        'Annen forelder': foreldrePenger.andreForeldersFnr,
        'Omsorgsovertakelse': 'Ikke implementert',
        'Foreldre av samme kjønn': 'Ikke implementert',
        'Antall barn': foreldrePenger.antallBarn
    };

    return (
        <Wrapper>
            <YtelserBullet tittel="Om foreldrepengeretten">
                <DescriptionList entries={foreldrePengeRetten}/>
            </YtelserBullet>
            <YtelserBullet tittel="Om barnet">
                <DescriptionList entries={barnet}/>
            </YtelserBullet>
        </Wrapper>
    );
}

export default Oversikt;
