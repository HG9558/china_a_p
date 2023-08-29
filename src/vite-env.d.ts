/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-comlink/client" />

interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_EN_NAME: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_OBSPORTEND: string;
    readonly VITE_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
