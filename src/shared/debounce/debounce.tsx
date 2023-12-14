export const debounce = (
  cb: (...args: unknown[]) => void,
  delay: number = 1000
) => {
  let timeout: string | number | NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
