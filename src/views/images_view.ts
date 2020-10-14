import Image from "../models/Image";

const imageView = {
  render(image: Image) {
    const { id, path } = image;
    return {
      id,
      url: `http://localhost:3333/uploads/${path}`,
    };
  },

  renderMany(images: Image[]) {
    return images?.map((image) => this.render(image));
  },
};

export default imageView;
