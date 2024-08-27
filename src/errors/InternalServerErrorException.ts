class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerErrorException";
  }
}

export default InternalServerErrorException;
