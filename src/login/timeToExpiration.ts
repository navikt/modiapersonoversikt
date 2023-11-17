import { ESTIMATED_EXPIRATION_IN_MS, INVALID_EXPIRATION_DATE } from './constants';

export const timeToExpiration = (expirationDate: number): number => {
    if (expirationDate === INVALID_EXPIRATION_DATE) {
        return ESTIMATED_EXPIRATION_IN_MS;
    }
    const currentDate = new Date().getTime();
    return expirationDate - currentDate;
};
