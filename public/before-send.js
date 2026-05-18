/* eslint-disable */
/* tslint:disable */

window.sendWithEventData = (_event, payload) => {
    const newUrl = new URL(window.location.href);
    if (newUrl.host.includes('localhost')) return false;

    newUrl.search = '';
    return {
        ...payload,
        url: newUrl.toString()
    };
};
