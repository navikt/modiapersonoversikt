import { createLazyFileRoute } from '@tanstack/react-router';
import VarslerNy from 'src/components/varsler/VarslerNy';
import { z } from 'zod';

const varslerSearchSchema = z.object({ page: z.number().catch(1) });

export const Route = createLazyFileRoute('/new/person/varsler')({
    component: VarslerNy,
    validateSearch: varslerSearchSchema
});
