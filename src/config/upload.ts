import multer from "multer";
import path from "path";
import { removeSpecialCharacters } from "../utils/format";

const uploadConfig = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${removeSpecialCharacters(
        file.originalname
      )}`;
      cb(null, fileName);
    },
  }),
};

export default uploadConfig;
