export const useWorker = new ComlinkWorker<typeof import("./useWorker")>(
    new URL("./useWorker", import.meta.url)
);

export const useHomeWorker = new ComlinkWorker<typeof import("./useHomeWorker")>(
    new URL("./useHomeWorker", import.meta.url)
);
