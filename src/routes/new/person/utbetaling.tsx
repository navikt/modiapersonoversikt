import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const utbetalingSearchSchema = z.object({
    periode: z.literal('siste30').optional()
});

export const Route = createFileRoute('/new/person/utbetaling')({
    validateSearch: utbetalingSearchSchema
});
