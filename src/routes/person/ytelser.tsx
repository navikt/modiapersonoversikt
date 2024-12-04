import { createFileRoute } from '@tanstack/react-router';
import Ytelser from 'src/app/personside/infotabs/ytelser/Ytelser';

export const Route = createFileRoute('/person/ytelser')({
    component: Ytelser
});
