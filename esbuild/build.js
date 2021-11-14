#!/usr/bin/env node

import esbuild from "esbuild";
import esbuildConfig from "../esbuild.config.js";

esbuild
	.build({
		...esbuildConfig,
	})
	.catch(() => process.exit(1));
