require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database"); // Since database has index.js so it doesn't include it in the address
const fs = require("fs");
const Blog = require("./model/blogModel");
const app = express();
const { multer, storage } = require("./middleware/multerConfig.js");
/**
 * Multer middleware instance configured with the specified storage engine.
 * Used to handle file uploads in Express routes by parsing multipart/form-data requests.
 * @type {import('multer').Multer}
 */
const upload = multer({ storage: storage });
const cors = require("cors");

app.use(express.json());

// Better way of handling cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://blog-project-g72m.onrender.com"],
  })
);

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
  // image is the field name that is sent from frontend
  // console.log(req.body);
  // const title = req.body.title;
  const { title, subtitle, description } = req.body;
  // console.log(req.file);
  const filename = req.file.filename;
  // console.log(filename);
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
  const blogs = await Blog.find();

  if (blogs.length == 0) {
    return res.status(404).json({
      message: "Data not found.",
    });
  }

  // Not recommended form of CORS handling
  // res.header("Access-Control-Allow-Origin", "http://localhost:5173");

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

app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  console.log(blog.image);
  const imageName = blog.image;

  fs.unlink(`storage/${imageName}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted successfully.");
    }
  });

  await Blog.findByIdAndDelete(id);
  res.status(200).json({
    message: "Blog deleted successfully.",
  });
});

app.patch("/blog/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { title, subtitle, description } = req.body;
  let imageName;

  if (req.file) {
    imageName = req.file.filename;
    const blog = await Blog.findById(id);
    console.log(blog.image);
    const oldImageName = blog.image;

    fs.unlink(`storage/${oldImageName}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File deleted successfully.");
      }
    });
  }

  await Blog.findByIdAndUpdate(id, {
    title: title,
    subtitle: subtitle,
    description: description,
    image: imageName,
  });
  res.status(200).json({
    message: "Blog updated successfully.",
  });
});

// Very Very Imp
app.use(express.static("./storage")); // Helps Frontend access the files

app.listen(process.env.PORT, () => {
  console.log("Server has been started.");
});
