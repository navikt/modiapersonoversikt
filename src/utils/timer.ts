import moment, { Moment } from 'moment';

export class Timer {
    private startTime?: Moment;

    public startTimer(): void {
        this.startTime = moment();
    }

    public getTime(): number {
        if (!this.startTime) {
            console.warn('Timer has not been started');
            return 0;
        }
        const time = moment();
        return moment.duration(time.diff(this.startTime)).asMilliseconds();
    }
}
