import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const varslerSearchSchema = z.object({ page: z.number().catch(1) });

export const Route = createFileRoute('/new/person/varsler')({
    validateSearch: varslerSearchSchema
});
