import { GuidePanel, ReadMore } from '@navikt/ds-react';
import type { SaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { ViktigAaViteAapInnhold } from './AapInnhold';
import { ViktigAaViteDagInnhold } from './DagInnhold';
import { ViktigAaViteIndInnhold } from './IndInnhold';

const ViktigAaVite = ({ valgtSak }: { valgtSak?: SaksDokumenter }) => {
    const temakoderMedTekst = ['AAP', 'DAG', 'IND'];

    if (!valgtSak || !temakoderMedTekst.includes(valgtSak.temakode)) {
        return null;
    }

    const innhold = () => {
        switch (valgtSak.temakode) {
            case 'AAP':
                return <ViktigAaViteAapInnhold />;
            case 'DAG':
                return <ViktigAaViteDagInnhold />;
            case 'IND':
                return <ViktigAaViteIndInnhold />;
            default:
                return null;
        }
    };

    const title = `Viktig å vite om ${valgtSak?.temanavn}`;

    return (
        <ReadMore size="small" aria-label={title} header={title} data-color="bg-gray-400">
            <GuidePanel>{innhold()}</GuidePanel>
        </ReadMore>
    );
};

export default ViktigAaVite;
