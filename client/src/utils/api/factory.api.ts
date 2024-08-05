const responseErrorHandler = (error: unknown) => {
  return Promise.reject(error);
};

const apiFactory = (baseUrl: string) => ({
  post: async <TInput, TOutput>(
    path: string,
    data: TInput
  ): Promise<TOutput> => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });

      return response.json() as Promise<TOutput>;
    } catch (error) {
      return responseErrorHandler(error);
    }
  },
});

export const api = apiFactory(`${process.env.REACT_APP_API_URL}`);
