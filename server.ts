import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Backend server URL
const API_URL = `http://localhost:5000/api/v1`;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname } = parsedUrl;

    // Proxy API requests to the backend server
    if (pathname?.startsWith("/api")) {
      // Remove the '/api' prefix before forwarding
      req.url = req.url?.replace(/^\/api/, "");

      createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // remove /api prefix when forwarding
        },
      })(req, res);
    } else {
      // Handle Next.js pages and other requests
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
    console.log(`> API proxy configured for /api -> ${API_URL}`);
  });
});
