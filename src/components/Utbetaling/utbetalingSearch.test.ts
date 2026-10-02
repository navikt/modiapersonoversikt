import { utbetalingSearchSchema } from 'src/routes/new/person/utbetaling';

it('godtar et besøk uten filter og forhåndsvalget Siste 30 dager fra Hjem', () => {
    expect(utbetalingSearchSchema.parse({})).toEqual({});
    expect(utbetalingSearchSchema.parse({ periode: 'siste30' })).toEqual({ periode: 'siste30' });
});

it('avviser ukjente perioder', () => {
    expect(utbetalingSearchSchema.safeParse({ periode: 'kommende' }).success).toBe(false);
});
