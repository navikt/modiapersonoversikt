import { Alert } from '@navikt/ds-react';

export const AlertBanner = ({ alerts }: { alerts: (string | undefined)[] }) => {
    return (
        <>
            {alerts.map((alert) => (
                <Alert className="mb-0.5" variant="warning" key={alert} size="small">
                    {alert}
                </Alert>
            ))}
        </>
    );
};
