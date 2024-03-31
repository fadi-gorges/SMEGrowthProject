import Resizer from "react-image-file-resizer";

export const resizeImage = (
  file: File,
  width: number,
  height: number
): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "JPEG",
      100,
      0,
      (newFile) => {
        resolve(newFile as File);
      },
      "file"
    );
  });
