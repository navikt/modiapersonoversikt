const { ESLINT_MODES } = require('@craco/craco');

module.exports = function({ env }) {
    return {
        eslint: {
            mode: ESLINT_MODES.file
        }
    };
};
