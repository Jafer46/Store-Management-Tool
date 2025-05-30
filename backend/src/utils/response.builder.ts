class ResponseObject {
  constructor(
    public success: boolean,
    public message: string,
    public data: any
  ) {}
}

export class ResponseBuilder<T> {
  public success: boolean = true;
  public message: string = "success";
  public data: T | null = null;

  public setData(data: T) {
    this.data = data;
    return this;
  }

  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  public setSuccess(success: boolean) {
    this.success = success;
    return this;
  }

  public build() {
    return new ResponseObject(this.success, this.message, this.data);
  }
}
