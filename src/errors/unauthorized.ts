export class UnauthorizedError extends Error {
  public code: number;

  constructor() {
    super('Unthorized error');
    this.code = 401;
    this.name = 'UnauthorizedError';
  }
}
