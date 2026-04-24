import { Contact } from "../models/index.js";
export const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  const item = await Contact.create({ name, email, message });
  res.json(item);
};
export const listContacts = async (req, res) => {
  const data = await Contact.findAll({ order: [["createdAt", "DESC"]] });
  res.json(data);
};
