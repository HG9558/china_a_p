export const setHeaderTheme = (path: string) => {
    const metaElement = document.querySelector('meta[name="theme-color"]');
    switch (path) {
        case "/login":
        case "/register":
            metaElement?.setAttribute("content", "#eeeff0");
            break;
        default:
            switch (true) {
                case path.includes("details"):
                    metaElement?.setAttribute("content", "#151d7e");
                    break;
                default:
                    metaElement?.setAttribute("content", "#3956CA");
                    break;
            }
            break;
    }
};
