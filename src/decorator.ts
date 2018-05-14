import { apiBaseUri } from './api/config';

interface Toggles {
    visEnhet: boolean;
    visSokefelt: boolean;
    visVeileder: boolean;
    visSokeIkon: boolean;
    visEnhetVelger: boolean;
}

interface MenyConfig {
    config: {
        toggles: Toggles;
        applicationName: string;
        fnr: string;
        dataSources: {
            veileder: string;
            enheter: string
        }
    };
}

declare global {
    interface Window {renderDecoratorHead: (_: MenyConfig) => void; }
}

declare global {
    type DecoratorPersonsokEvent = EventListenerOrEventListenerObject & {fodselsnummer: string};
}

const config: MenyConfig = {
    config: {
        toggles: {
            visEnhet: true,
            visEnhetVelger: true,
            visSokefelt: true,
            visVeileder: true,
            visSokeIkon: false
        },
        applicationName: 'Modia personoversikt',
        fnr: '',
        dataSources: {
            veileder: `${apiBaseUri}/hode/me`,
            enheter: `${apiBaseUri}/hode/enheter`
        }

    }
};

export default function (fodselsnummer: string) {
    config.config.fnr = fodselsnummer;
    if (window.renderDecoratorHead) {
        window.renderDecoratorHead(config);
    }
}
