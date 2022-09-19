const SentryCli = require('@sentry/cli');

async function createReleaseAndUpload() {
    const release = process.env.GIT_COMMIT_HASH;
    if (!release) {
        console.warn('GIT_COMMIT_HASH is not set');
        return;
    }
    if (!process.env.SENTRY_AUTH_TOKEN) {
        throw new Error('"SENTRY_AUTH_TOKEN" er ikke satt');
    }

    const cli = new SentryCli();
    try {
        console.log('Creating sentry release ' + release);
        await cli.releases.new(release);
        console.log('Uploading source maps');
        await cli.releases.uploadSourceMaps(release, {
            include: ['build/static/js'],
            urlPrefix: '~/modiapersonoversikt/static/js',
            rewrite: false
        });
        console.log('Finalizing release');
        await cli.releases.finalize(release);
    } catch (e) {
        console.error('Source maps uploading failed:', e);
    }
}
createReleaseAndUpload();
