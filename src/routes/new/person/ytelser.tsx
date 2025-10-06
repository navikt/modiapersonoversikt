import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const ytelseSearchSchema = z.object({
    id: z.string().optional()
});

export const ytelserRouteMiddleware = keepQueryParams(['id']);

export const Route = createFileRoute('/new/person/ytelser')({
    validateSearch: ytelseSearchSchema,
    search: {
        middlewares: [ytelserRouteMiddleware]
    }
});
