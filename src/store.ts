export interface StoreListener {
    (): void;
}

export class BaseStore<TActions> {
    private _handlers: StoreListener[] = [];

    constructor(protected readonly actionsHub: TActions) {
        this.init();
    }

    public addListener(handler: StoreListener) {
        this._handlers.push(handler);
    }

    public removeListener(handler: StoreListener) {
        for (let i = 0; i < this._handlers.length; ++i) {
            if (this._handlers[i] === handler) {
                this._handlers.splice(i, 1);
            }
        }
    }

    protected init() {
    }

    protected emitChanged() {
        for (let handler of this._handlers) {
            handler();
        }
    }
}

export interface ActionListener<TPayload> {
    (payload: TPayload): void;
}

export class Action<TPayload> {
    private _listeners: ActionListener<TPayload>[] = [];

    public addListener(listener: ActionListener<TPayload>): void {
        this._listeners.push(listener);
    }

    public invoke(payload: TPayload): void {
        for (const listener of this._listeners) {
            listener(payload);
        }
    }
}