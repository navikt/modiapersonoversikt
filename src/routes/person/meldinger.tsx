import { createFileRoute } from '@tanstack/react-router';
import MeldingerContainer from 'src/app/personside/infotabs/meldinger/MeldingerContainer';
import { keepQueryParamsSimple } from 'src/utils/keepQueryParamsSimple';
import { z } from 'zod';

const meldingerSearchSchema = z.object({
    traadId: z.string().optional()
});

export const Route = createFileRoute('/person/meldinger')({
    component: MeldingerContainer,
    validateSearch: meldingerSearchSchema,
    search: {
        middlewares: [keepQueryParamsSimple(['traadId'])]
    }
});
