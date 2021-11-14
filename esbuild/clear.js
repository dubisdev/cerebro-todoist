#!/usr/bin/env node

import path from "path";
const dist = path.resolve("dist");

process.on("unhandledRejection", (err) => {
	throw err;
});

import fs from "fs-extra";

if (fs.existsSync(dist)) {
	console.log(`Removing ${dist}...`);
	fs.removeSync(dist);
	console.log(`Done!`);
}
