import { apiBaseUri } from '../../api/config';
import { settValgtEnhet } from './context-api';

interface Config {
    config: {
        dataSources: {
            veileder: string;
            enheter: string;
        };
        toggles: {
            visEnhet: boolean;
            visEnhetVelger: boolean;
            visSokefelt: boolean;
            visVeileder: boolean;
            visSokeIkon: boolean;
        };
        applicationName: string;
        initiellEnhet?: string;
        fnr?: string;
        handleChangeEnhet(enhet: string): void;
    };
}

const config = (fnr: string, enhet: string): Config => ({
    config: {
        applicationName: 'Modia personoversikt',
        dataSources: {
            veileder: `${apiBaseUri}/hode/me`,
            enheter: `${apiBaseUri}/hode/enheter`
        },
        fnr: fnr,
        initiellEnhet: enhet,
        handleChangeEnhet: settValgtEnhet,
        toggles: {
            visEnhet: false,
            visEnhetVelger: true,
            visSokefelt: true,
            visVeileder: true,
            visSokeIkon: false
        }
    }
});

declare global {
    interface Window {
        renderDecoratorHead: (_: Config) => void;
    }
}

export const initialiserToppmeny = (fnr: string, enhet: string): void => {
    const configWithFnr = config(fnr, enhet);
    window.renderDecoratorHead(configWithFnr);
};
