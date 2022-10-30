import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "juani029",
  api_key: "187796448951268",
  api_secret: "i7JxAan6SRvP9sbCdu9XvpadscE",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
