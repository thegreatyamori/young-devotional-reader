import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/young-devotional-reader/",
    server: {
        fs: {
            strict: true,
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
            },
        },
        assetsInclude: ["**/*.md"], // Incluir archivos markdown como assets
    },
    publicDir: "public", // Asegurarse de que la carpeta public se copie
});
