import http from "http";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "links.json");
const PUBLIC_DIR = path.join(__dirname, "public");

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

async function saveLinks(links) {
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2));
}

function getContentType(file) {
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".html")) return "text/html";
  return "text/plain";
}

const server = http.createServer(async (req, res) => {

  // Serve frontend files
  if (req.method === "GET") {
    let filePath = req.url === "/"
      ? path.join(PUBLIC_DIR, "index.html")
      : path.join(PUBLIC_DIR, req.url);

    try {
      const file = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": getContentType(filePath) });
      return res.end(file);
    } catch {}
  }

  // Fetch all links
  if (req.method === "GET" && req.url === "/links") {
    const links = await loadLinks();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(links));
  }

  // Create short link
  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {
      try {
        const { url, shortcode } = JSON.parse(body);

        if (!url) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "URL required" }));
        }

        const links = await loadLinks();
        const finalCode = shortcode || crypto.randomBytes(4).toString("hex");

        if (links[finalCode]) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "Shortcode exists" }));
        }

        links[finalCode] = url;
        await saveLinks(links);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // 🔁 REDIRECTION LOGIC (IMPORTANT PART)
  if (req.method === "GET" && req.url.length > 1) {
    const shortCode = req.url.slice(1);
    const links = await loadLinks();

    if (links[shortCode]) {
      res.writeHead(302, { Location: links[shortCode] });
      return res.end();
    }
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(3002, () => {
  console.log("Running at http://localhost:3002");
});
