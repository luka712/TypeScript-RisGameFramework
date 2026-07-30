/**
 * The time information.
 */
export class GameTime {

    /**
     * Time since last call to framework update method.
     */
    public elapsedTotalTime: number = 0;

    /**
     * Total elapsed time in milliseconds.
     */
    public elapsedTimeMs: number = 0;

    /**
     * Elapsed time in seconds.
     */
    public elapsedTimeSec: number = 0;

    /**
     * Delta time in milliseconds.
     * This is the time between the current frame and the last frame in milliseconds.
     */
    public deltaTimeMs: number = 0;

    /**
     * Delta time in seconds. This is the time between the current frame and the last frame in seconds.
     */
    public deltaTimeSec: number = 0;
}
