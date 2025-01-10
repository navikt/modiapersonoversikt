export const getWindowFeature = (toggle: keyof typeof window.applicationFeatureToggles): boolean => {
    if (!window.applicationFeatureToggles) {
        return false;
    }

    return typeof window.applicationFeatureToggles[toggle] === 'boolean' && window.applicationFeatureToggles[toggle];
};
