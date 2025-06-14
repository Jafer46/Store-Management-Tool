class ResponseObject {
  constructor(
    public success: boolean,
    public message: string,
    public data: any,
    public page: number = 1,
    public items: number = 1
  ) {}
}

export class ResponseBuilder<T> {
  private success: boolean = true;
  private message: string = "success";
  private data: T | null = null;
  private page: number = 1;
  private items: number = 1;

  public setData(data: T) {
    this.data = data;
    if (!data) this.items = 0;
    if (Array.isArray(data)) this.items = data.length;
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

  public setPage(page: number) {
    this.page = page;
    return this;
  }

  public build() {
    return new ResponseObject(
      this.success,
      this.message,
      this.data,
      this.page,
      this.items
    );
  }
}
