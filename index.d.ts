/// <reference types="node" />

export interface InputStream extends NodeJS.WritableStream {
    close: () => void;
    setGain: (gain: number) => void;
    connection: Connection;
    channels: number;
    whisperId: number;
    sampleRate: number;
    gain: number;
    bitDepth: number;
    signed: boolean;
    endianness: "BE" | "LE";
    processInterval: NodeJS.Timer;
    processObserver: NodeJS.EventEmitter;
    frameQueue: Buffer[];
    lastFrame: Buffer;
    lastFrameWritten: number;
    queuedForPlay: number;
    lastWrite: number;
    sent: number;
}

export interface OutputStream extends NodeJS.ReadableStream {
    close: () => void;
    connection: Connection;
    sessionId: number;
    eventEmitter: NodeJS.EventEmitter;
    frames: Buffer[];
    writtenUntil: number;
    noEmptyFrames: boolean;
    emptyFrame: Buffer;
    voiceListener: (data: Buffer) => void;
}
export interface Channel {
    addSubChannel: (name: string, options: any) => void;
    getPath: () => string[];
    getPermissions: (callback: () => any) => void;
    join: () => void;
    remove: () => void;
    sendMessage: (message: string) => void;
    children: Channel[];
    links: Channel[];
    users: User[];
    name: string;
    id: number;
    parent?: Channel;
    position: number;
}

export interface User {
    channel: Channel;
    deaf: boolean;
    hash: string;
    id: number;
    mute: boolean;
    name: string;
    prioritySpeaker: boolean;
    recording: boolean;
    selfDeaf: boolean;
    selfMute: boolean;
    session: number;
    suppress: boolean;
    ban: (reason?: string) => void;
    canHear: () => boolean;
    canTalk: () => boolean;
    inputStream: () => InputStream;
    isRegistered: () => boolean;
    kick: (reason?: string) => void;
    moveToChannel: (channel: Channel) => void;
    outputStream: (noEmptyFrames?: boolean) => OutputStream;
    sendMessage: (message: string) => void;
    setComment: (comment: string) => void;
    setSelfDeaf: (isSelfDeaf: boolean) => void;
    setSelfMute: (isSelfMute: boolean) => void;
    setDeaf: (isDeaf: boolean) => void;
    setMute: (isMute: boolean) => void;
    on: (event: string, callback: (...args: any[]) => any) => void;
    once: (event: string, callback: (...args: any[]) => any) => void;
    register: () => void;
}

export interface Options {
    key?: string;
    cert?: string;
    celtVersion?: string;
}

export interface Connection {
    authenticate: (username: string, password: string) => void;
    users: () => User[];
    channelById: (id: number) => Channel;
    userById: (id: number) => User;
    userBySession: (id: number) => User;
    channelByName: (name: string) => Channel;
    userByName: (name: string) => User;
    sendMessage: (name: string, data: any) => void;
    outputStream: (userId?: number) => OutputStream;
    inputStream: () => InputStream;
    disconnect: () => void;
    sendVoice: (chunk: Buffer) => void;
    on: (event: string, callback: (...args: any[]) => any) => void;
    once: (event: string, callback: (...args: any[]) => any) => void;
    removeListener: (eventName: string | symbol, listener: (...args: any[]) => void) => void;
    ready: boolean;
    rootChannel: Channel;
    user: User;
    getRegisteredUsers: (callback: (registeredUsers: any[]) => void) => void;
}

export interface Client extends Connection {
    connection: Connection;
    sendMessage: (name: string, data: string) => void;
}

export function connect(url: string, options: Options, callback: (err: Error, client: Client) => void): void;
