import express from "express";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "links.json");

// Middleware
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.static("public"));

// Load links
async function loadLinks() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({}));
    return {};
  }
}

// Save links
async function saveLinks(links) {
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
}

// Home page
app.get("/", async (req, res) => {
  try {
    const file = await fs.readFile(
      path.join(__dirname, "views", "index.html"),
      "utf-8"
    );

    const links = await loadLinks();

    const listHTML = Object.entries(links)
      .map(
        ([code, url]) =>
          `<li>
            <a href="/${code}" target="_blank">
              ${req.headers.host}/${code}
            </a>
            → ${url.length > 50 ? url.slice(0, 50) + "..." : url}
          </li>`
      )
      .join("");

    const finalPage = file.replace("{{ shortened_urls }}", listHTML);

    res.send(finalPage);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Handle form submit
app.post("/", async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const links = await loadLinks();

    const finalCode = shortCode || crypto.randomBytes(4).toString("hex");

    if (links[finalCode]) {
      return res.send("Short code already exists. Try another.");
    }

    links[finalCode] = url;
    await saveLinks(links);

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving link");
  }
});

// Redirect route
app.get("/:shortCode", async (req, res) => {
  const links = await loadLinks();
  const { shortCode } = req.params;

  if (!links[shortCode]) {
    return res.status(404).send("Short link not found");
  }

  res.redirect(links[shortCode]);
});

// Start server
app.listen(3002, () => {
  console.log("Server running at http://localhost:3002");
});
