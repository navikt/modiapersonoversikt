import { createFileRoute } from '@tanstack/react-router';
import InnkrevingskravSide from 'src/app/innkrevingskrav/InnkrevingskravSide';
import { z } from 'zod';

const innkrevingsKravSearchSchema = z.object({
    kravId: z.preprocess(String, z.string().optional())
});
export const Route = createFileRoute('/innkrevingskrav')({
    component: InnkrevingsKravRoute,
    validateSearch: innkrevingsKravSearchSchema
});

function InnkrevingsKravRoute() {
    return <InnkrevingskravSide />;
}
