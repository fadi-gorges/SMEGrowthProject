export const readDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
};
