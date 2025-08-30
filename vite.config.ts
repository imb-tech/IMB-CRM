import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import path from "path"

export default defineConfig({
    plugins: [TanStackRouterVite({}), react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        port: 3002,
        proxy: {
            "/api": {
                target: loadEnv("development", process.cwd(), '').VITE_DEFAULT_URL, // backend manzili
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
                configure: (proxy) => {
                    proxy.on("proxyReq", (_, req, res) => {
                        if (req.headers.accept?.includes("text/html")) {
                            res.writeHead(404, { "Content-Type": "text/html" })
                            res.end('<h1 style="display: flex; justify-content:center; align-items:center; height: 100vh; font-size: 58px;">PAGE NOT FOUND!</h1>')
                        }
                    })
                },

            },
        },
    }
})
