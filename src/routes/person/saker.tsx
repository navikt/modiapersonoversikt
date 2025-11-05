import { createFileRoute } from '@tanstack/react-router';
import SaksoversiktContainer from 'src/app/personside/infotabs/saksoversikt/SaksoversiktContainerV2';
import { keepQueryParamsSimple } from 'src/utils/keepQueryParamsSimple';
import { z } from 'zod';

export const sakerSearchSchema = z.object({
    sakstema: z.string().optional(),
    avsender: z.array(z.enum(['nav', 'bruker', 'andre'])).default(['nav', 'andre', 'bruker']),
    dokument: z.string().optional()
});

export const Route = createFileRoute('/person/saker')({
    component: SaksoversiktContainer,
    validateSearch: sakerSearchSchema,
    search: {
        middlewares: [keepQueryParamsSimple(['sakstema', 'avsender', 'dokument'])]
    }
});
