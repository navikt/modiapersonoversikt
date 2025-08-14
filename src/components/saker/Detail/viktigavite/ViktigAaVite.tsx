import { ExpansionCard } from '@navikt/ds-react';
import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import { ViktigAaViteAapInnhold } from './AapInnhold';
import { ViktigAaViteDagInnhold } from './DagInnhold';
import { ViktigAaViteIndInnhold } from './IndInnhold';

const ViktigAaVite = ({ valgtSakstema }: { valgtSakstema?: Sakstema }) => {
    const temakoderMedTekst = ['AAP', 'DAG', 'IND'];

    if (!valgtSakstema || !temakoderMedTekst.includes(valgtSakstema.temakode)) {
        return null;
    }

    const innhold = () => {
        switch (valgtSakstema.temakode) {
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

    const title = `Viktig å vite om ${valgtSakstema?.temanavn}`;

    return (
        <ExpansionCard size="small" aria-label={title} className="border-1 border-border-subtle border-gray-200">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">{title}</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{innhold()}</ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default ViktigAaVite;
