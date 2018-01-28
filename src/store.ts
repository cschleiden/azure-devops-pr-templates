export interface StoreListener {
    (): void;
}

class BaseStore {
    private _handlers: StoreListener[] = [];

    public addListener(handler: StoreListener) {
        this._handlers.push(handler);
    }

    protected _emitChanged() {
        for (let handler of this._handlers) {
            handler();
        }
    }
}
