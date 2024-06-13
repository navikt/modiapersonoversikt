export const getWindowFeature = (toggle: string): boolean => {
    if (!window.applicationFeatureToggles) {
        return false;
    }

    return (
        (typeof window.applicationFeatureToggles[toggle] === 'boolean' && window.applicationFeatureToggles[toggle]) ||
        window.applicationFeatureToggles[toggle] === 'true'
    );
};
