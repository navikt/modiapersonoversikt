const environment = import.meta.env.MODE;

export function isTest(): boolean {
    return environment === 'test';
}

export function isDevelopment(): boolean {
    return environment === 'development';
}

export const getEnvFromHost = () => {
    switch (window.location.host) {
        case 'app.adeo.no':
        case 'modiapersonoversikt.intern.nav.no':
            return 'prod';
        case 'app-q1.adeo.no':
            return 'q1';
        case 'app-q0.adeo.no':
            return 'q0';
        case 'modiapersonoversikt.intern.dev.nav.no':
            return 'q2';
    }
    return 'mock';
};

export const getDomainFromHost = (): 'ANSATT' | 'NAV_NO' | 'LOCAL' => {
    const matchAnsatt = window.location.host.match(/\.ansatt\.(dev)?\.nav\.no/);
    if (matchAnsatt) return 'ANSATT';

    const matchIntern = window.location.host.match(/\.intern\.(dev)?\.nav\.no/);
    if (matchIntern) return 'NAV_NO';

    return 'LOCAL';
};
