const { ESLINT_MODES } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const { ChangeJsFilename, ChangeCssFilename } = require('@navikt/craco-plugins');

module.exports = function () {
    return {
        eslint: {
            mode: ESLINT_MODES.file
        },
        plugins: [{ plugin: CracoLessPlugin }, { plugin: ChangeCssFilename }, { plugin: ChangeJsFilename }]
    };
};
