import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const dokumentSearchSchema = z.object({
    dokument: z.preprocess(String, z.string().catch('')),
    journalpost: z.preprocess(String, z.string().optional())
});

export const Route = createFileRoute('/new/dokument')({
    validateSearch: dokumentSearchSchema
});
