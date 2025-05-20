import { WebpackConfiguration } from "@remotion/bundler";
import path from "path";

export const webpackOverride = (currentConfiguration: WebpackConfiguration) => {
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
          //   if (rule?.test?.toString().includes(".css")) {
          //     return false;
          //   }
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
