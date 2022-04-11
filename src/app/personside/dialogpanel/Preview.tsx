import * as React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../styles/personOversiktTheme';
import EtikettGraa from '../../../components/EtikettGraa';
import { formatterDatoTid } from '../../../utils/date-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { useSendtMelding } from './useSendtMelding';
import { SendNyMeldingStatus } from './sendMelding/SendNyMeldingTypes';
import { Traad } from '../../../models/meldinger/meldinger';

const PreviewStyle = styled.article`
    padding: 1rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: ${theme.borderRadius.layout};
    > * {
        margin-bottom: 0.5rem;
    }
    overflow-wrap: break-word;
`;

interface Props {
    tittel: string;
    fritekst: string;
    meldingstatus: SendNyMeldingStatus;
    traad?: Traad;
}

function Preview(props: Props) {
    const sendtMelding = useSendtMelding(props.fritekst, props.traad);

    let opprettetDato = null;
    if (sendtMelding.melding) {
        opprettetDato = <EtikettGraa>{formatterDatoTid(sendtMelding.melding.opprettetDato)}</EtikettGraa>;
    } else if (props.meldingstatus !== SendNyMeldingStatus.ERROR) {
        opprettetDato = <NavFrontendSpinner type="XXS" />;
    }

    return (
        <PreviewStyle>
            <Normaltekst>{props.tittel}</Normaltekst>
            {opprettetDato}
            <Tekstomrade>{props.fritekst}</Tekstomrade>
        </PreviewStyle>
    );
}

export default Preview;
