import { createFileRoute } from '@tanstack/react-router';
import MeldingerContainer from 'src/app/personside/infotabs/meldinger/MeldingerContainer';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const meldingerSearchSchema = z.object({
    traadId: z.string().optional()
});

export const Route = createFileRoute('/person/meldinger')({
    component: MeldingerContainer,
    validateSearch: meldingerSearchSchema,
    search: {
        middlewares: [keepQueryParams(['traadId'])]
    }
});
