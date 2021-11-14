#!/usr/bin/env node

"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
	throw err;
});

const path = require("path");
const fs = require("fs");

const appName = process.argv[2] === "dev" ? "Electron" : "Cerebro";

const homeDir = require("os").homedir();

const pluginName = require(path.join(path.resolve(), "package.json")).name;

let symlinkPath;

if (process.platform === "darwin") {
	symlinkPath = path.join(
		homeDir,
		"Library",
		"Application Support",
		appName,
		"plugins",
		"node_modules",
		pluginName
	);
} else if (process.platform === "win32") {
	symlinkPath = path.join(
		process.env.APPDATA,
		appName,
		"plugins",
		"node_modules",
		pluginName
	);
} else {
	symlinkPath = path.join(
		homeDir,
		".config",
		appName,
		"plugins",
		"node_modules",
		pluginName
	);
}

console.log("Start plugin development");
if (fs.existsSync(symlinkPath)) {
	console.log("   Symlink already exist");
	removeSymlink();
}

console.log("   Create symlink");
fs.symlinkSync(
	path.resolve(),
	symlinkPath,
	process.platform === "win32" ? "junction" : "file"
);

// Handle ctrl+c to remove symlink to plugin
process.on("SIGHUP", removeSymlink);
process.on("SIGINT", removeSymlink);
process.on("SIGTERM", removeSymlink);
process.on("SIGBREAK", removeSymlink);

console.log("   Starting esbuild...");

function removeSymlink() {
	console.log("   Removing symlink");
	fs.unlinkSync(symlinkPath);
}

const cssModulesPlugin = require("esbuild-css-modules-plugin");

require("esbuild")
	.build({
		logLevel: "info",
		entryPoints: ["src/index.tsx"],
		watch: true,
		bundle: true,
		minify: true,
		format: "cjs",
		target: "es2016",
		loader: { ".js": "jsx", ".png": "dataurl", ".svg": "text" },
		outfile: "dist/index.js",
		plugins: [cssModulesPlugin()],
	})
	.catch(() => process.exit(1));
