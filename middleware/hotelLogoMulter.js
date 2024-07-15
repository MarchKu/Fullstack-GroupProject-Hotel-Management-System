import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const hotelLogoMulter = upload.single("hotel_logo");

export const runHotelLogoMulter = (req, res, fn) => {
  return Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      } else {
        return resolve(result);
      }
    });
  });
};

export default hotelLogoMulter;
