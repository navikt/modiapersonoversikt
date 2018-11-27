import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { utledMaksDato, utledRettighetFraDato } from './utils';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';
import { createDescriptionList } from '../../../../../utils/list';
import { BulletPoint } from '../../../../../components/common-styled-components';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    foreldrePengerRespons: ForeldrepengerResponse;
}

const Wrapper = styled.div`
  dl {
      dd {
        font-weight: bold;
        margin-top: .3rem;
      }
      margin: 1rem 0 2rem;
      display: flex;
      flex-wrap: wrap;
      > div {
        margin-bottom: ${theme.margin.px30};
        padding-right: 2rem;
        flex: 0 0 50%;
      }
  }
`;

function Foreldrepenger(props: Props) {

    const foreldrepenger = props.foreldrePengerRespons.foreldrepenger;

    if (foreldrepenger === null) {
        return <AlertStripeInfo>Finner ingen foreldrepengerettigheter for bruker</AlertStripeInfo>;
    }

    console.log(foreldrepenger);

    const foreldrePengeRetten = createDescriptionList({
        'Foreldrepengetype': foreldrepenger.foreldrepengetype,
        'Dekningsgrad': foreldrepenger.dekningsgrad + '%',
        'Dagsats': 'Ikke implementert',
        'Graderingsdager': 'Ikke implementert',
        'Fedrekvote tilogmed': 'Ikke implementert',
        'Mødrekvote tilogmed': 'Ikke implementert',
        'Rettighet fra dato': datoVerbose(utledRettighetFraDato(foreldrepenger)).sammensatt,
        'Restdager': foreldrepenger.restDager,
        'Maksdato': utledMaksDato(foreldrepenger),
        'Arbeidskategori': 'Ikke implementert'
    });

    const barnet = createDescriptionList({
        'Termindato': foreldrepenger.rettighetFom && datoVerbose(foreldrepenger.rettighetFom).sammensatt,
        'Fødselsdato': foreldrepenger.barnetsFødselsdato && datoVerbose(foreldrepenger.barnetsFødselsdato).sammensatt,
        'Annen forelder': foreldrepenger.andreForeldersFnr,
        'Omsorgsovertakelse': 'Ikke implementert',
        'Foreldre av samme kjønn': 'Ikke implementert',
        'Antall barn': foreldrepenger.antallBarn
    });

    return (
        <Wrapper>
            <BulletPoint showBulletPoint={true} color={theme.color.ytelser}>
                <Undertittel>Om foreldrepengeretten</Undertittel>
            </BulletPoint>
            {foreldrePengeRetten}
            <BulletPoint showBulletPoint={true} color={theme.color.ytelser}>
                <Undertittel>Barnet</Undertittel>
            </BulletPoint>
            {barnet}
        </Wrapper>
    );
}

export default Foreldrepenger;
