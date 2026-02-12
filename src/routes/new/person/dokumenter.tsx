import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const dokumenterSearchSchema = z.object({
    tema: z.array(z.string()).optional(),
    saksid: z.string().optional(),
    fra: z.string().optional(),
    til: z.string().optional()
});

export const dokumenterRouteMiddleware = () => keepQueryParams(['tema', 'saksid', 'fra', 'til']);

export const Route = createFileRoute('/new/person/dokumenter')({
    validateSearch: dokumenterSearchSchema,
    search: {
        middlewares: [dokumenterRouteMiddleware()]
    }
});
