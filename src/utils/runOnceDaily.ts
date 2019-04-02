import moment from 'moment';
import * as Cookies from 'js-cookie';
import { formaterDato } from './stringFormatting';

export function runOnceDaily(id: string, fn: Function) {
    if (checkIfLoggedToday(id)) {
        return;
    }
    fn();
    setLoggedTodayCookie(id);
}

function checkIfLoggedToday(id: string) {
    const cookie = Cookies.get(id);
    if (cookie) {
        return true;
    }
    return false;
}

function setLoggedTodayCookie(id: string) {
    const tomorrow = moment()
        .add(1, 'day')
        .startOf('day')
        .toDate();
    Cookies.set(id, id + ' was reported ' + formaterDato(new Date()), {
        expires: tomorrow
    });
}
