export const getBuffer = async (file: File) => {
  const fileReader = file.stream().getReader();
  const fileDataU8 = [];

  while (true) {
    const { done, value } = await fileReader.read();
    if (done) break;

    fileDataU8.push(...value);
  }

  return Buffer.from(new Uint8Array(fileDataU8));
};
