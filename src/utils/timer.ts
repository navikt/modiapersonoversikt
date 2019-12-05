export class Timer {
    private startTime?: number;

    public startTimer(): void {
        this.startTime = Date.now();
    }

    public getTime(): number {
        if (!this.startTime) {
            console.warn('Timer has not been started');
            return 0;
        }
        return Date.now() - this.startTime;
    }
}
