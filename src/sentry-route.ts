import * as Sentry from '@sentry/react';
import { Route } from 'react-router-dom';

export const SentryRoute = Sentry.withSentryRouting(Route);
