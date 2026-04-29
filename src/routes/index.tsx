import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const indexSearchSchema = z.object({
    sokFnrCode: z.string().optional(),
    sokFnr: z.string().optional(),
    henvendelseId: z.string().optional(),
    oppgaveId: z.string().optional(),
    behandlingsId: z.string().optional()
});

export const Route = createFileRoute('/')({
    validateSearch: indexSearchSchema
});
