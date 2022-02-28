export class InvalidOperationError extends Error {
  constructor(m: string);
  constructor(m: string, error?: Error) {
    super(`InvalidOperationError: ${m}`);
    this.message ??= error?.message ?? m ?? '';
    this.name ??= error?.name ?? '';
    this.stack ??= error?.stack;
  }
}
