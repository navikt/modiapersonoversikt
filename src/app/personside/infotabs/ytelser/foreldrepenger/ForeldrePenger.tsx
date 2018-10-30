import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { utledMaksDato, utledRettighetFraDato } from './utils';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';
import { createDescriptionList } from '../../../../../utils/list';

interface Props {
    foreldrePengerRespons: ForeldrepengerResponse;
}

const Wrapper = styled.div`
  dl {
      dd {
        font-weight: bold;
        margin-bottom: .5rem;
      }
      margin: 1rem 0 2rem;
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
            <Undertittel>Om foreldrepengeretten</Undertittel>
            {foreldrePengeRetten}
            <Undertittel>Barnet</Undertittel>
            {barnet}
        </Wrapper>
    );
}

export default Foreldrepenger;
