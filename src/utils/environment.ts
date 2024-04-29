const environment = import.meta.env.MODE;

export function isTest(): boolean {
    return environment === 'test';
}

export function isDevelopment(): boolean {
    return environment === 'development';
}
