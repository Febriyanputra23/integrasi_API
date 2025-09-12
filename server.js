// Import library
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json());

// Data dummy untuk reviews
let reviews = [
  {
    id: 1,
    filmId: "2baf70d1-42bb-4437-b551-e5fed5a87abe", // contoh: Spirited Away
    user: "Andi",
    rating: 5,
    comment: "Film animasi terbaik sepanjang masa!"
  },
  {
    id: 2,
    filmId: "12cfb892-14c1-4415-8e7a-e87c9b884a5e", // contoh: Grave of the Fireflies
    user: "Budi",
    rating: 4,
    comment: "Sedih tapi sangat bagus."
  }
];

// 1. Endpoint cek status server
app.get("/status", (req, res) => {
  res.json({ status: "OK", message: "Server berjalan dengan baik" });
});

// 2. Endpoint ambil semua review
app.get("/reviews", (req, res) => {
  res.json(reviews);
});

// 3. Endpoint ambil review berdasarkan id
app.get("/reviews/:id", (req, res) => {
  const review = reviews.find(r => r.id == req.params.id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "Review tidak ditemukan" });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
