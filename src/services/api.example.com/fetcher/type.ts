export type HttpStatus = number;

export type Err = {
  message: string;
  status: HttpStatus;
  errors?: { code: string; name: string; message: string }[];
};

export type ErrResponse = {
  data: null;
  err: Err;
  status: HttpStatus;
};

export type DataResponse<T> = {
  data: T;
  err: null;
  status: HttpStatus;
};

export type HttpResponse<T> = DataResponse<T> | ErrResponse;
