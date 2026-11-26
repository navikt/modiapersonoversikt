import { createInterface } from 'node:readline';
import { Writable } from 'node:stream';

if (!process.stdin.isTTY) {
    console.error('Kjør skriptet i en interaktiv terminal for å lime inn tokenet.');
    process.exitCode = 1;
} else {
    const hiddenOutput = new Writable({
        write(_chunk, _encoding, callback) {
            callback();
        }
    });
    const reader = createInterface({
        input: process.stdin,
        output: hiddenOutput,
        terminal: true,
        historySize: 0
    });
    let finished = false;

    const finish = (code, message, token) => {
        if (finished) return;
        finished = true;
        reader.close();
        process.stdin.pause();
        process.stderr.write('\n');
        process.exitCode = code;
        if (message) console.error(message);
        if (token) process.stdout.write(token);
    };

    reader.once('line', (input) => {
        const token = input.trim().replace(/^(['"])(.*)\1$/, '$2');
        if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) {
            finish(1, 'Tokenet har feil format. Lim inn verdien av access_token, ikke hele JSON-responsen.');
            return;
        }
        finish(0, undefined, token);
    });
    reader.once('close', () => finish(1, 'Ingen token lest. Start skriptet på nytt.'));
    reader.once('SIGINT', () => finish(130, 'Avbrutt.'));
    process.stdin.once('error', () => finish(1, 'Kunne ikke lese tokenet. Start skriptet på nytt.'));
    process.once('SIGINT', () => finish(130, 'Avbrutt.'));
    process.once('SIGTERM', () => finish(143, 'Avbrutt.'));
    process.once('SIGHUP', () => finish(129, 'Avbrutt.'));

    process.stderr.write('Lim inn verdien av access_token (skjult), og trykk Enter: ');
}
