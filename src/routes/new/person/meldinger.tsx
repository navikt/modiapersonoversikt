import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const meldingerSearchSchema = z.object({
    traadId: z.string().optional()
});

export const meldingerRouteMiddleware = () => keepQueryParams(['traadId']);

export const Route = createFileRoute('/new/person/meldinger')({
    validateSearch: meldingerSearchSchema,
    search: {
        middlewares: [meldingerRouteMiddleware()]
    }
});
