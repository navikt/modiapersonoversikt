import NavFrontendSpinner from 'nav-frontend-spinner';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import EtikettGraa from '../../../components/EtikettGraa';
import type { Traad } from '../../../models/meldinger/meldinger';
import theme from '../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../utils/date-utils';
import { SendNyMeldingStatus } from './sendMelding/SendNyMeldingTypes';
import { useSendtMelding } from './useSendtMelding';

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
    const sendtMelding = useSendtMelding(props.traad);

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
