import { Books } from "../models/Books.js";
import { uploadToCloudinary } from "../services/cloudinaryUpload.js";

export async function listAllBooks(req, res) {
  try {
    const books = await Books.find({});
    res.send(books);
  } catch (err) {
    console.log(err);
  }
}

export async function listSingleBook(req, res) {
  const idToFind = req.params.id;
  if (!idToFind)
    return res.status(500).send({ message: "Must specify a book id" });

  try {
    const book = await Books.findById(idToFind);
    if (!book)
      return res.status(500).send({ message: "No book found with given ID" });

    res.send(book);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteBook(req, res) {
  const idToDelete = req.params.id;
  if (!idToDelete)
    return res.status(500).send({ message: "Must specify a book id" });

  try {
    const book = await Books.findByIdAndDelete(idToDelete);
    if (!book)
      return res.status(500).send({ message: "No book found with given ID" });

    res.send({ message: "Book Deleted" });
  } catch (err) {
    console.log(err);
  }
}

export async function updateBook(req, res) {
  const idToUpdate = req.params.id;
  if (!idToUpdate)
    return res.status(500).send({ message: "Must specify a book id" });
  try {
    const { title, author, genre, description, price, image } = req.body;
    const book = await Books.findByIdAndUpdate(idToUpdate, {
      title,
      author,
      genre,
      description,
      price,
      image,
    });
    if (!book)
      return res.status(500).send({ message: "No book found with given ID" });

    res.send({ message: "Book Updated" });
  } catch (err) {
    console.log(err);
  }
}

export async function addBook(req, res) {
  try {
    let url = await uploadToCloudinary(req);
    const { title, author, genre, description, price, image } = req.body;
    const newBook = new Books({
      title,
      author,
      genre,
      description,
      price,
      image: url,
    });
    await newBook.save();
    res.status(201).send({ message: "Book Added" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
}
