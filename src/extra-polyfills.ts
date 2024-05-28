import './utils/array-utils';

if (!Element.prototype.matches) {
    // @ts-ignore
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Bare for å gjøre TS happy
const dummy = {};
