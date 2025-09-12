// Import library
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json()); // supaya bisa baca JSON dari request body

// ====== DATA DUMMY REVIEWS ======
let reviews = [
    {
        id: 1,
        filmId: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
        user: "Andi",
        rating: 5,
        comment: "Film animasi terbaik sepanjang masa!"
    }
];

// ====== ENDPOINT GET ======
app.get("/status", (req, res) => {
    res.json({ status: "OK", message: "Server berjalan dengan baik" });
});

app.get("/reviews", (req, res) => {
    res.json(reviews);
});

app.get("/reviews/:id", (req, res) => {
    const review = reviews.find(r => r.id == req.params.id);
    if (review) {
        res.json(review);
    } else {
        res.status(404).json({ error: "Review tidak ditemukan" });
    }
});

// ====== ENDPOINT POST ======
app.post("/reviews", (req, res) => {
    const { filmId, user, rating, comment } = req.body;
    if (!filmId || !user || !rating || !comment) {
        return res.status(400).json({ error: "Semua field wajib diisi!" });
    }

    const newReview = {
        id: reviews.length + 1,
        filmId,
        user,
        rating,
        comment
    };

    reviews.push(newReview);
    res.status(201).json(newReview);
});

// ====== ENDPOINT PUT ======
app.put("/reviews/:id", (req, res) => {
    const { id } = req.params;
    const { filmId, user, rating, comment } = req.body;

    const review = reviews.find(r => r.id == id);
    if (!review) {
        return res.status(404).json({ error: "Review tidak ditemukan" });
    }

    if (filmId) review.filmId = filmId;
    if (user) review.user = user;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    res.json(review);
});

// ====== ENDPOINT DELETE ======
app.delete("/reviews/:id", (req, res) => {
    const { id } = req.params;
    const index = reviews.findIndex(r => r.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Review tidak ditemukan" });
    }

    const deletedReview = reviews.splice(index, 1);
    res.json({ message: "Review berhasil dihapus", deleted: deletedReview });
});

// ====== JALANKAN SERVER ======
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
