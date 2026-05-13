/* eslint-disable */
/* tslint:disable */

window.sendWithEventData = (_event, payload) => {
    const url = new URL(payload.url, location.href);
    if (url.host.includes('localhost')) return false;

    url.search = '';

    return {
        ...payload,
        url: url.toString()
    };
};
