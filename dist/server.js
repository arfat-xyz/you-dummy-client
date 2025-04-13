"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
// Backend server URL
const API_URL = `https://u-dummy-server.vercel.app/api/v1`;
app.prepare().then(() => {
    const server = (0, http_1.createServer)((req, res) => {
        var _a;
        const parsedUrl = (0, url_1.parse)(req.url, true);
        const { pathname } = parsedUrl;
        // Proxy API requests to the backend server
        if (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/api")) {
            // Remove the '/api' prefix before forwarding
            req.url = (_a = req.url) === null || _a === void 0 ? void 0 : _a.replace(/^\/api/, "");
            (0, http_proxy_middleware_1.createProxyMiddleware)({
                target: API_URL,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "", // remove /api prefix when forwarding
                },
            })(req, res);
        }
        else {
            // Handle Next.js pages and other requests
            handle(req, res, parsedUrl);
        }
    });
    server.listen(port, () => {
        console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
        console.log(`> API proxy configured for /api -> ${API_URL}`);
    });
});
