interface Toggles {
    visEnhet: boolean;
    visSokefelt: boolean;
    visVeileder: boolean;
}

interface MenyConfig {
    config: {
        toggles: Toggles;
        applicationName: string;
    };
}

declare global {
    interface Window {renderDecoratorHead: (_: MenyConfig) => void; }
}

const config: MenyConfig = {
    config: {
        toggles: {
            visEnhet: true,
            visSokefelt: true,
            visVeileder: true
        },
        applicationName: 'Modia personoversikt'
    }
};

export default function () {
    window.renderDecoratorHead(config);
}
