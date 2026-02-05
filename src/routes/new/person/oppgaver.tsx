import { createFileRoute } from '@tanstack/react-router';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const OppgaveSearchSchema = z.object({
    id: z.string().optional()
});

export const oppgaveRouteMiddleware = () => keepQueryParams(['id']);

export const Route = createFileRoute('/new/person/oppgaver')({
    validateSearch: OppgaveSearchSchema,
    search: {
        middlewares: [oppgaveRouteMiddleware()]
    }
});
