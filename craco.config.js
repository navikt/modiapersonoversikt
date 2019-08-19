const { ESLINT_MODES } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');

const DisableAsciiOnly = {
    overrideWebpackConfig: ({ webpackConfig, context: { env } }) => {
        if (env === 'production') {
            webpackConfig.optimization.minimizer[0].options.terserOptions.output.ascii_only = false;
        }
        return webpackConfig;
    }
};

module.exports = function({ env }) {
    return {
        eslint: {
            mode: ESLINT_MODES.file
        },
        plugins: [{ plugin: DisableAsciiOnly }, { plugin: CracoLessPlugin }]
    };
};
