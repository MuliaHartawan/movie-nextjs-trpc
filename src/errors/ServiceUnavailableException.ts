export class ServiceUnavailableException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceUnavailableException";
  }
}

export default ServiceUnavailableException;
