import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const utbetalingSearchSchema = z.object({
    id: z.string().optional()
});

export const utbetalingRouteMiddleware = keepQueryParams(['id']);

export const Route = createFileRoute('/new/person/utbetaling')({
    validateSearch: utbetalingSearchSchema,
    search: {
        middlewares: [utbetalingRouteMiddleware]
    }
});
