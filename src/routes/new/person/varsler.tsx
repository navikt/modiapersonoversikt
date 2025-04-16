import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const varselSearchSchema = z.object({
    id: z.string().optional()
});

export const Route = createFileRoute('/new/person/varsler')({
    validateSearch: varselSearchSchema,
    search: {
        middlewares: [keepQueryParams(['id'])]
    }
});
