import { createFileRoute } from '@tanstack/react-router';
import SaksoversiktContainer from 'src/app/personside/infotabs/saksoversikt/SaksoversiktContainerV2';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const sakerSearchSchema = z.object({
    sakstema: z.string().optional()
});

export const Route = createFileRoute('/person/saker')({
    component: SaksoversiktContainer,
    validateSearch: sakerSearchSchema,
    search: {
        middlewares: [keepQueryParams(['sakstema'])]
    }
});
