export interface IWindowManager {

    /**
     * Gets the HTMLCanvasElement associated with this WindowManager.
     */
    get canvas(): HTMLCanvasElement;

    /**
     * Registers a callback to be invoked on each update event.
     * @param callback The callback function.
     */
    updateEvent(callback: () => void) : void;

    /**
     * Registers a callback to be invoked on each render event.
     * @param callback The callback function.
     */
    renderEvent(callback: () => void) : void;

    /**
     * Starts the window's event loop.
     */
    runEventLoop() : void;

}