require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database"); // Since database has index.js so it doesn't include it in the address
const Blog = require("./model/blogModel");
const app = express();
const { multer, storage } = require("./middleware/multerConfig.js");
const upload = multer({ storage: storage });

app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  // res.send("Welcome Mausam Thapa Magar");
  res.status(200).json({
    message: "Welcome Mausam Ji",
  });
});

app.get("/about", (req, res) => {
  res.status(200).json({
    message: "This is about page",
  });
});

app.post("/blog", upload.single("image"), async (req, res) => {
  // image is the field name that it sent from frontend
  // console.log(req.body);
  // const title = req.body.title;
  const { title, subtitle, description } = req.body;
  const filename = req.file.filename;
  // const {filename} = req.file;

  if (!title || !subtitle || !description || !filename) {
    return res.status(400).json({
      message: "Please enter all details.",
    });
  }
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  });
  res.status(200).json({
    message: "Blog API hit successfully.",
  });
});

app.get("/blog", async (req, res) => {
  const blogs = await Blog.find(); // returns array
  res.status(200).json({
    message: "Blogs fetched successfully.",
    data: blogs,
  });
});

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id; // In MongoDB objectId are in 24 hex format
  const blog = await Blog.findById(id); // returns a single object

  if (!blog) {
    return res.status(404).json({
      message: "Data not found.",
    });
  }

  res.status(200).json({
    message: "Fetched Successfully.",
    data: blog,
  });
});

app.use(express.static("./storage")); // Helps Frontend access the files

app.listen(process.env.PORT, () => {
  console.log("Server has been started.");
});

// mongodb+srv://mausam:FhFZ0H4ongw85ZfL@cluster0.9ligjln.mongodb.net/?appName=Cluster0
