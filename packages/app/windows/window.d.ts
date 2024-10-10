interface Window {
  electron: {
    send: (channel: string, data: any) => void;
    on: (
      channel: string,
      listener: (event: string, ...args: any[]) => void
    ) => void;
    invoke: <P, R>(channel: string, data?: P) => Promise<R>;
    removeEventListener: (
      channel: string,
      listener: (event: string, ...args: any[]) => void
    ) => void;
  };
}
