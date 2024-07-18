import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadFilesMulter = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "imageGallery", maxCount: 4 },
]);
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default runMiddleware;
