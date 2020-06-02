const { ESLINT_MODES } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const fs = require('fs');

const HostFilesPlugin = {
    overrideDevServerConfig: ({ devServerConfig, pluginOptions }) => {
        const originalBefore = devServerConfig.before;
        const config = pluginOptions.configFiles
            .map(configFile => fs.readFileSync(__dirname + configFile, 'UTF-8'))
            .map(configFile => JSON.parse(configFile))
            .reduce((acc, list) => acc.concat(list), [])
            .filter(config => config.file && config.url);

        devServerConfig.before = (app, server, compiler) => {
            config.forEach(({ url, file }) => {
                app.get(url, (req, resp) => {
                    console.log(`[HostingFile] ${url} --> ${file}`);
                    resp.sendFile(__dirname + file);
                });
            });

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

const hostFilePluginConfig = {
    plugin: HostFilesPlugin,
    options: {
        configFiles: ['/src/mock/saksoversikt/mock-files.json']
    }
};
module.exports = function({ env }) {
    return {
        eslint: {
            mode: ESLINT_MODES.file
        },
        plugins: [hostFilePluginConfig, { plugin: DisableAsciiOnly }, { plugin: CracoLessPlugin }]
    };
};
