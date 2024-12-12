import { loggEvent } from './logger/frontendLogger';
import { Timer } from './timer';

const timer = new Timer();

const reportTime = () => {
    const timeSpent = timer.getTime();
    loggEvent('Report', 'TimeSpent', undefined, { ms: timeSpent });
};

const startTimer = () => {
    timer.startTimer();
};

const handleVisibilityChange = () => {
    const wasHidden = document.hidden;
    if (wasHidden) {
        reportTime();
    } else {
        startTimer();
    }
};

export function setupTimeSpentMetrics() {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', reportTime);
    startTimer();
}
