import { UnmountClosed } from 'react-collapse';
import styled from 'styled-components';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import theme from '../../../../../styles/personOversiktTheme';
import { ViktigÅViteAAPInnhold } from './AAPInnhold';
import { ViktigÅViteDAGInnhold } from './DAGInnhold';
import { ViktigAaViteINDInnhold } from './INDInnhold';

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

    //biome-ignore lint/suspicious/noImplicitAnyLet: biome migration
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
