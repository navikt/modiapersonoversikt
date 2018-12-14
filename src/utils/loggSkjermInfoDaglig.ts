import { loggEvent } from './frontendLogger';
import { default as Cookies } from 'universal-cookie';
import * as moment from 'moment';

const cookies = new Cookies();
const cookieNavn = 'loggScreenResolutionCookie';

export function loggSkjermInfoDaglig() {
    if (checkIfLoggedToday()) {
        return;
    }
    loggInfo();
    setLoggedTodayCookie();
}

function checkIfLoggedToday() {
    const cookie = cookies.get(cookieNavn);
    if (cookie) {
        return true;
    }
    return false;
}

function setLoggedTodayCookie() {
    const tomorrow = moment().add(1, 'day').startOf('day').toDate();
    cookies.set(
        cookieNavn,
        'Screen resolution was logged today',
        {
            expires: tomorrow
        });
}

function loggInfo() {
    const screen: Screen = window.screen;

    const resolutionScreen = `${screen.width} x ${screen.height}`;
    const resolutionWindow = `${window.innerWidth} x ${window.innerHeight}`;

    loggEvent(resolutionScreen, 'SkjermOppløsning');
    loggEvent(resolutionWindow, 'VinduStørrelse');
}
