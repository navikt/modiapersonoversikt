import { Oppgave } from '../../models/oppgave';
import { removeDuplicateOppgaver } from './useTildelteOppgaver';

test('filtrerer bort duplikater', () => {
    const oppgave1 = {
        oppgaveid: 'id1',
        henvendelseid: 'henv1',
        fødselsnummer: '123'
    };
    const oppgave2 = {
        oppgaveid: 'id2',
        henvendelseid: 'henv2',
        fødselsnummer: '124'
    };
    const oppgaver: Oppgave[] = [oppgave1, oppgave2, { ...oppgave1 }];
    const filtrerteOppgaver = oppgaver.filter(removeDuplicateOppgaver);
    expect(filtrerteOppgaver).toHaveLength(2);
    expect(filtrerteOppgaver).toContain(oppgave1);
    expect(filtrerteOppgaver).toContain(oppgave2);
});
