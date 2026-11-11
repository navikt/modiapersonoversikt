import { createLazyFileRoute } from '@tanstack/react-router';
import { LandingPage } from 'src/components/Decorator/LandingPage';

export const Route = createLazyFileRoute('/landingpage')({
    component: LandingPage
});
