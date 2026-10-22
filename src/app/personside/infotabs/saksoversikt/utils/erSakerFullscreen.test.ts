import { erSakerFullscreen } from './erSakerFullscreen';

test.each(['/saker', '/saker/'])('gjenkjenner fullskjermruten %s', (pathname) => {
    expect(erSakerFullscreen(pathname)).toBe(true);
});

test.each(['/person/saker', '/new/person/dokumenter', '/saker-arkiv', '/saker/dokument', '/'])(
    'regner ikke %s som fullskjermruten',
    (pathname) => {
        expect(erSakerFullscreen(pathname)).toBe(false);
    }
);
