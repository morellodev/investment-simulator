export const pick =
  <T extends object, K extends keyof T>(keys: K[]) =>
  (obj: T): Pick<T, K> => {
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Pick<T, K>);
  };
