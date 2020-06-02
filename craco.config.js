const { ESLINT_MODES } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');

const HostFilesPlugin = {
    overrideDevServerConfig: ({ devServerConfig }) => {
        const originalBefore = devServerConfig.before;
        devServerConfig.before = (app, server, compiler) => {
            app.get(
                '/modiapersonoversikt-api/rest/saker/:fnr/dokument/:journalpostId/:dokumentReferanse',
                (req, resp) => {
                    resp.sendFile(__dirname + '/src/mock/saksoversikt/mock-dokument.pdf');
                }
            );
            originalBefore(app, server, compiler);
        };
        return devServerConfig;
    }
};

const DisableAsciiOnly = {
    overrideWebpackConfig: ({ webpackConfig, context }) => {
        if (context.env === 'production') {
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
        plugins: [{ plugin: HostFilesPlugin }, { plugin: DisableAsciiOnly }, { plugin: CracoLessPlugin }]
    };
};
