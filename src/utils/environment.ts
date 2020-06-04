const environment = process.env.NODE_ENV;

export function isTest(): boolean {
    return environment === 'test';
}

export function isDevelopment(): boolean {
    return environment === 'development';
}
