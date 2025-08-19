import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const sakerSearchSchema = z.object({
    id: z.string().optional()
});

export const Route = createFileRoute('/new/person/saker')({
    validateSearch: sakerSearchSchema,
    search: {
        middlewares: [keepQueryParams(['id'])]
    }
});
