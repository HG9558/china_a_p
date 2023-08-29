import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import svgLoader from "vite-svg-loader";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import { comlink } from "vite-plugin-comlink";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { viteVConsole } from "vite-plugin-vconsole";
import path from "path";

const timestamp = Date.now();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const isDev = mode === "development";
    console.log(env.VITE_API);
    const lifecycle = process.env.npm_lifecycle_event;
    return {
        // base: env.VITE_BASE || "./",
        plugins: [
            vue(),
            comlink(),
            svgLoader(),
            ViteImageOptimizer(),
            VitePWA({
                manifest: false,
                devOptions: {
                    enabled: false,
                },
                registerType: "autoUpdate",
                workbox: {
                    globPatterns: ["**/*.{js,css,svga,gz,json,gif,svg,png}"],
                    navigateFallback: null,
                    clientsClaim: true,
                },
            }),
            Components({
                dirs: [],
                resolvers: [VantResolver()],
            }),
            createHtmlPlugin({
                inject: {
                    data: {
                        ...env,
                    },
                },
            }),
            legacy({
                targets: ["chrome >= 64", "edge >= 79", "safari >= 11.1", "firefox >= 67"],
                ignoreBrowserslistConfig: true,
                renderLegacyChunks: false,
                modernPolyfills: ["es/global-this"],
            }),
            lifecycle === "report" &&
                (visualizer({ open: true, filename: "./dist/stats.html" }) as any),
            viteCompression({
                deleteOriginFile: true,
                algorithm: "gzip",
                filter: /\.(js|mjs|json|css)(?<!manifest\.json)$/i,
            }),
            /* isDev &&
                viteVConsole({
                    entry: path.resolve("src/main.ts"),
                    localEnabled: isDev && true,
                }), */
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/styles/theme.scss";`,
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        server: {
            open: true,
            proxy: {
                "/api": {
                    target: env.VITE_API,
                    changeOrigin: true,
                },
                "/obsportend": {
                    target: env.VITE_OBSPORTEND,
                    changeOrigin: true,
                },
            },
            cors: true,
        },
        optimizeDeps: { exclude: ["swiper/vue", "swiper/types"] },
        worker: {
            plugins: [comlink()],
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name]-${timestamp}.js`,
                },
            },
        },
        build: {
            minify: "terser",
            target: "es2015",
            assetsInlineLimit: 0,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ["console.log"],
                },
            },
            manifest: true,
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    sourcemap: false,
                    chunkFileNames: `assets/js/[name]-[hash].js`,
                    entryFileNames: `assets/js/[name]-[hash].js`,
                    assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
                    manualChunks(id): string {
                        const regs =
                            /(lottie-web-vue|swiper|vant|@vant|@fingerprintjs|axios|crypto-js|i18next)/;
                        if (id.includes("node_modules")) {
                            const names = id.toString().split("node_modules/")[1].split("/")[0];
                            if (regs.test(names)) {
                                return names.toString();
                            }
                        }
                        if (/(.scss)/.test(id)) {
                            return "styles";
                        }
                        return undefined;
                    },
                },
            },
        },
    };
});
