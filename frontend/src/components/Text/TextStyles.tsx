export const gradientTextStyles = `bg-gradient-to-r from-cyan-400 to-blue-500 dark:to-white text-transparent bg-clip-text`;

export const textLimit = (text: string, limit: number) => {
  if (text?.length > limit) {
    return `${text.substring(0, limit)}...`;
  } else {
    return text;
  }
};
