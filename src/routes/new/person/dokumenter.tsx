import { createFileRoute } from '@tanstack/react-router';
import { DokumentmetadataAvsender } from 'src/generated/modiapersonoversikt-api';
import { keepQueryParams } from 'src/utils/keepQueryParams';
import { z } from 'zod';

const dokumenterSearchSchema = z.object({
    tema: z.array(z.string()).optional(),
    avsendere: z.array(z.nativeEnum(DokumentmetadataAvsender)).optional(),
    saksid: z.string().optional(),
    fra: z.string().optional(),
    til: z.string().optional()
});

export const dokumenterRouteMiddleware = () => keepQueryParams(['tema', 'avsendere', 'saksid', 'fra', 'til']);

export const Route = createFileRoute('/new/person/dokumenter')({
    validateSearch: dokumenterSearchSchema,
    search: {
        middlewares: [dokumenterRouteMiddleware()]
    }
});
