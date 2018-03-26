interface Toggles {
    visEnhet: boolean;
    visSokefelt: boolean;
    visVeileder: boolean;
    visSokeIkon: boolean;
}

interface MenyConfig {
    config: {
        toggles: Toggles;
        applicationName: string;
        fnr: string;
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
            visSokefelt: true,
            visVeileder: true,
            visSokeIkon: false
        },
        applicationName: 'Modia personoversikt',
        fnr: ''
    }
};

export default function (fodselsnummer: string) {
    config.config.fnr = fodselsnummer;
    if (window.renderDecoratorHead) {
        console.log('Rendrer hode med config: ', config);
        window.renderDecoratorHead(config);
    }
}
