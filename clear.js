#!/usr/bin/env node

const path = require("path");
const dist = path.resolve("dist");

process.on("unhandledRejection", (err) => {
	throw err;
});

const fs = require("fs-extra");

if (fs.existsSync(dist)) {
	console.log(`Removing ${dist}...`);
	fs.removeSync(dist);
	console.log(`Done!`);
}
