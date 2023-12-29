import { Schema, model } from "mongoose";

// fields option: type, required, trim, unique
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    roll: {
      type: String,
    },
    foto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, objectReturn) => {
    objectReturn.id = objectReturn._id;
    delete objectReturn._id;
    delete objectReturn.__v;
    delete objectReturn.password;
  },
});

export default model("user", userSchema);
