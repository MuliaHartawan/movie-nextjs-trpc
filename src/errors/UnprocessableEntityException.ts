class UnprocessableEntityException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnprocessableEntityException";
  }
}

export default UnprocessableEntityException;
