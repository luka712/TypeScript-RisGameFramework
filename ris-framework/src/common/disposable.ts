export interface IDisposable {
    /**
     * Disposes of the resources used by this object. After calling this method, the object should not be used anymore.
     * This method should be idempotent, meaning that calling it multiple times should not cause any issues.
     */
    dispose(): void;
}