#!/usr/bin/env node

const cssModulesPlugin = require("esbuild-css-modules-plugin");

require("esbuild")
	.build({
		logLevel: "info",
		entryPoints: ["src/index.tsx"],
		bundle: true,
		minify: true,
		format: "cjs",
		target: "es2016",
		loader: { ".js": "jsx", ".png": "dataurl", ".svg": "text" },
		outfile: "dist/index.js",
		plugins: [cssModulesPlugin()],
	})
	.catch(() => process.exit(1));
