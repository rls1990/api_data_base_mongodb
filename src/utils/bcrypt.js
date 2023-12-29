import bcrypt from "bcrypt";

export const encrypt = async (data) => {
  return await bcrypt.hash(data, 10);
};

export const compare = async (data, data_encript) => {
  return await bcrypt.compare(data, data_encript);
};
