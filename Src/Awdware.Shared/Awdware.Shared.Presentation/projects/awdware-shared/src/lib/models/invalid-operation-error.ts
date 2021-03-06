export class InvalidOperationError extends Error {
  constructor(m: string);
  constructor(m: string, error?: Error) {
    super('InvalidOperationError: ' + m);
  }
}
