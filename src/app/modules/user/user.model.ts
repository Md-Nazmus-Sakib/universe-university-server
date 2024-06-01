import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//virtual
// userSchema.virtual('fullName').get(function(){
//   return this.name.firstName+ this.name.middleName+this.name.lastName;
// })

//pre save middleware/hook:will work om  create()  save()

userSchema.pre("save", async function (next) {
  //console.log(this, 'pre hook:we will save data');

  const user = this;
  //hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware / hook
// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
