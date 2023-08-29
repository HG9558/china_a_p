const fs = require("fs");
const path = require("path");

const htmlContent = fs.readFileSync("./dist/index.html", "utf-8");
const timeStamp = Date.now();
const packageJsonPath = "./package.json";
const packageJson = require(packageJsonPath);
const version = packageJson.version;
const manifestPath = path.resolve(__dirname, "./dist/manifest.json");
const manifestsPath = path.resolve(__dirname, "./dist/manifests.json");
const manifestContent = fs.readFileSync(manifestPath, "utf8");
const manifestsContent = fs.readFileSync(manifestsPath, "utf8");
const manifest = JSON.parse(manifestContent);
const manifests = JSON.parse(manifestsContent);
manifest.version = version;
manifests.version = version;

let modifiedHtmlContent = htmlContent
    .replace(/\.json(["'])?/g, `.json?t=${timeStamp}$1`)
    .replace(/\.css(["'])?/g, `.css?t=${timeStamp}$1`)
    .replace(/\.ico(["'])?/g, `.ico?t=${timeStamp}$1`);

modifiedHtmlContent.replace(/\.js(["'])?/g, `.js?t=${timeStamp}$1`);

fs.writeFileSync("./dist/manifest.json", JSON.stringify(manifest, null, 2), "utf8");
fs.writeFileSync("./dist/manifests.json", JSON.stringify(manifests, null, 2), "utf8");

fs.writeFileSync("./dist/index.html", modifiedHtmlContent, "utf-8");
