import { hentBaseUrl } from './baseurls';

const url = 'https://lenke.com';
const url2 = 'https://lenke2.com';
const key1 = 'lenkeSomFinnes';
const key2 = 'endaEnlenkeSomFinnes';
const baseUrlResponse = {
    baseUrls: [
        {
            key: key1,
            url: url
        },
        {
            key: key2,
            url: url2
        }
    ]
};

it('Returnerer URL dersom key finnes i lista', () => {
    expect(hentBaseUrl(baseUrlResponse, key1)).toEqual(url);
    expect(hentBaseUrl(baseUrlResponse, key2)).toEqual(url2);
});

it('Returnerer tom string dersom key ikke finnes i lista', () => {
    const keySomIkkeFinnes = 'lenkeSomIkkeFinnes';

    expect(hentBaseUrl(baseUrlResponse, keySomIkkeFinnes)).toEqual('');
});
