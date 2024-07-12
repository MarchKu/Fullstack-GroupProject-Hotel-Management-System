import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerMiddleware = upload.single("profile_picture");

export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default multerMiddleware;
