export class ActivityMonitor {
    private lastActivity: number = new Date().getTime();

    public update() {
        this.lastActivity = new Date().getTime();
    }

    public timeSinceLastActivity(): number {
        return new Date().getTime() - this.lastActivity;
    }
}
