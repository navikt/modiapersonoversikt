import './utils/array-utils';

if (!Element.prototype.matches) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Bare for å gjøre TS happy
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummy = {};
