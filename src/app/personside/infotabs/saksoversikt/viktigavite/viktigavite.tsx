import { ViktigÅViteDAGInnhold } from './DAGInnhold';
import { ViktigÅViteAAPInnhold } from './AAPInnhold';
import { ViktigAaViteINDInnhold } from './INDInnhold';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { UnmountClosed } from 'react-collapse';

type Props = {
    valgtSakstema?: Sakstema;
    open: boolean;
};

const Luft = styled.div`
    margin-top: ${theme.margin.px10};
`;

const GråttPanel = styled.div`
    ${theme.graattPanel};
`;

const ViktigÅVite = ({ valgtSakstema, open }: Props) => {
    if (!valgtSakstema) {
        return <Luft />;
    }

    let innhold;
    switch (valgtSakstema.temakode) {
        case 'AAP':
            innhold = ViktigÅViteAAPInnhold();
            break;
        case 'DAG':
            innhold = ViktigÅViteDAGInnhold();
            break;
        case 'IND':
            innhold = ViktigAaViteINDInnhold();
            break;
        default:
            return null;
    }

    return (
        <UnmountClosed isOpened={open}>
            <GråttPanel>{innhold}</GråttPanel>
        </UnmountClosed>
    );
};

export default ViktigÅVite;
