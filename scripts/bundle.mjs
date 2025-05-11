import path from "path";
import { bundle } from "@remotion/bundler";
import fs from "fs/promises";

const outDir = path.join(process.cwd(), "worker", "src", "bundle");
const serverBundleDir = path.join(process.cwd(), "server", "bundle");

const webpackOverride = (currentConfiguration) => {
  return {
    ...currentConfiguration,
    resolve: {
      ...currentConfiguration.resolve,
      alias: {
        ...currentConfiguration.resolve?.alias,
        "@": path.join(process.cwd(), "src"),
      },
    },
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules
          ? currentConfiguration.module.rules
          : []
        ).filter((rule) => {
          if (rule === "...") {
            return false;
          }
          if (rule.test?.toString().includes(".css")) {
            return false;
          }
          return true;
        }),
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    "postcss-preset-env",
                    "tailwindcss",
                    "autoprefixer",
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  };
};

const serveUrl = await bundle({
  entryPoint: path.join(process.cwd(), "src/_remotion/index.ts"),
  webpackOverride: webpackOverride,
  outDir: outDir,
});

async function copyBundleToServer() {
  try {
    await fs.mkdir(serverBundleDir, { recursive: true });

    const files = await fs.readdir(outDir);

    console.log(`Copying ${files.length} files to server bundle directory...`);

    for (const file of files) {
      const srcPath = path.join(outDir, file);
      const destPath = path.join(serverBundleDir, file);

      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        await fs.cp(srcPath, destPath, { recursive: true, force: true });
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }

    console.log(`Bundle successfully copied to ${serverBundleDir}`);
  } catch (error) {
    console.error("Error copying bundle to server:", error);
  }
}

await copyBundleToServer();

console.log(`Bundle created at: ${outDir}`);
console.log(`Bundle copied to server at: ${serverBundleDir}`);
console.log(serveUrl);
