import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
const API = "eae9562ae9e94f90a9c272c1faf0b8cc";
const url = "https://api.rawg.io/api/games";
const dbCredentials = {
    database: "gamelist",
    user: "postgres",
    password: "eddie",
    host: "localhost",
    port: 5432
}

const db = new pg.Client(dbCredentials);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let gameList = [];
let gameId;

async function getImage(gameList) {
    for (let n of gameList) {
        const response = await axios.get(`${url}?key=${API}&search=${n.title}`);
        let img = response.data.results[0].background_image;
        n["image"] = img;
    }

    return gameList;
};

/* home page & sorting */
app.get("/", async (req, res) => {

    switch (req.query.sort) {
        case "title-asc":

            try {
                const result = await db.query("SELECT * FROM games ORDER BY title ASC");
                gameList = result.rows;

                await getImage(gameList);
            } catch (error) {
                console.log(error);
            }

            break;

        case "rating-desc":
            try {
                const result = await db.query("SELECT * FROM games ORDER BY rating DESC");
                gameList = result.rows;

                await getImage(gameList);
            } catch (error) {
                console.log(error);
            }

            break;

        case "date-asc":
            try {
                const result = await db.query("SELECT * FROM games ORDER BY id ASC");
                gameList = result.rows;

                await getImage(gameList);
            } catch (error) {
                console.log(error);
            }

            break;

        default:
            try {
                const result = await db.query("SELECT * FROM games ORDER BY id ASC");
                gameList = result.rows;

                await getImage(gameList);
            } catch (error) {
                console.log(error);
            }

            break;
    }


    res.render("index.ejs", { games: gameList });
});


/* add new item, page */
app.get("/add", (req, res) => {
    res.render("add.ejs");
});


/* insert new item to db */
app.post("/submit", async (req, res) => {
    const gameData = req.body;

    try {
        await db.query("INSERT INTO games(title, description, rating) VALUES ($1, $2, $3)", [gameData.title, gameData.description, gameData.inlineRadioOptions]);
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");
});


/* edit existing item based on id */
app.get('/edit/:id', async (req, res) => {
    gameId = req.params;


    try {
        const result = await db.query("SELECT * FROM games WHERE id=$1", [gameId.id]);
        gameList = result.rows;
        await getImage(gameList);
    } catch (error) {
        console.log(error);
    }

    res.render("edit.ejs", { game: gameList });
});


/* delete existing item based on id */
app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        await db.query("DELETE FROM games WHERE id=$1", [id]);
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");

});


/* WARNING DELETE ALL FROM DB */
app.get("/deleteAll", async (req, res) => {
    try {
        await db.query("TRUNCATE TABLE games");
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");
});


/* send update to db */
app.post("/update", async (req, res) => {
    const gameData = req.body;
    const id = req.params.id;

    try {
        await db.query("UPDATE games SET title=$1, description=$2 WHERE id=$3", [gameData.title, gameData.description, gameData.id]);
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");
});




app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});