import { createLazyFileRoute } from '@tanstack/react-router';
import { LandingPage } from 'src/app/internarbeidsflatedecorator/LandingPage';

export const Route = createLazyFileRoute('/landingpage')({
    component: <LandingPage />
});
