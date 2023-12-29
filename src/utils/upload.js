import multer from "multer";

const storageTemp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/data/temp");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split().pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

export const uploadTemp = multer({ storage: storageTemp });

export const uploadMemo = multer({ storage: multer.memoryStorage() });

export const upload = multer();
