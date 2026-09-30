const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Document = require("./models/Document");

dotenv.config();

const documents = [
  {
    title: "React Hooks Tutorial",
    content:
      "Learn React hooks including useState and useEffect",
    url: "/react-hooks",
    category: "React",
  },

  {
    title: "JavaScript Tutorial",
    content:
      "Learn JavaScript variables functions arrays and objects",
    url: "/javascript",
    category: "JavaScript",
  },

  {
    title: "Node.js Guide",
    content:
      "Learn Node.js Express REST APIs and backend development",
    url: "/node",
    category: "Node",
  },

  {
    title: "React State Management",
    content:
      "Learn React state management using hooks and Redux",
    url: "/react-state",
    category: "React",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Document.deleteMany();

  await Document.insertMany(documents);

  console.log("Documents inserted");

  process.exit();
}

seed();