import { Request, Response } from "express";
import { getRepository, Index } from "typeorm";
import Orphanage from "../models/Orphanages";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanage);
      const orphanages = await orphanagesRepository.find({
        relations: ["images"],
      });
      return response.status(201).json(orphanageView.renderMany(orphanages));
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const orphanagesRepository = getRepository(Orphanage);
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ["images"],
      });
      return response.status(201).json(orphanageView.render(orphanage));
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages?.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const orphanage = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
