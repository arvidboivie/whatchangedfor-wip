export type DataResponse<Type, Key extends string> = {
  result: {
    data: {
      [key in Key]: Type[];
    };
  };
};
