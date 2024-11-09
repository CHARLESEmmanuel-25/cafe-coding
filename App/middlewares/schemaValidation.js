// schemas.js
import Joi from 'joi';

export const registerSchema = Joi.object({
  nom: Joi.string().min(2).max(50).required(),
  prenom: Joi.string().min(2).max(50).required(),
  mail: Joi.string().email().required(),
  pseudo: Joi.string().alphanum().min(3).max(30).required(),
  motDePasse: Joi.string().min(8).required(),
  short_description: Joi.string().max(250).optional(),
  photo: Joi.string().uri().optional()
});
