import { loggEvent } from './frontendLogger';

export function loggSkjermInfo() {
    loggInfo();
}

function loggInfo() {
    const screen: Screen = window.screen;

    const resolutionScreen = `${screen.width} x ${screen.height}`;
    const resolutionWindow = `${window.innerWidth} x ${window.innerHeight}`;

    loggEvent(resolutionScreen, 'SkjermOppløsning');
    loggEvent(resolutionWindow, 'VinduStørrelse');
}
