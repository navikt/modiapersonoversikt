const env = window?.__ENV__ ?? {};

export default {
    draftWsUrl: env.PUBLIC_DRAFT_WS_URL,
    isProd: env.PUBLIC_ENVIRONMENT === 'prod'
};
