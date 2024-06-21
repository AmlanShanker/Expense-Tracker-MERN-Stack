import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Shambhavi",
    lastName: "Shanker",
    email: "shankershambhavi@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    location: "Hyderabad,Ind",
    occupation: "Full Stack Web Developer",
  },
  {
    _id: userIds[1],
    firstName: "Neelam",
    lastName: "Srivatsava",
    email: "neelam@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    location: "Vasundhara,Gzb",
    occupation: "Homemaker",
  },
  {
    _id: userIds[2],
    firstName: "Gyan",
    lastName: "Shanker",
    email: "shanker@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    location: "Vasundhara,Gzb",
    occupation: "Zonal Manager",
  },
];
