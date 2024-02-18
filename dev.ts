#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import * as dotenv from "https://deno.land/std@0.216.0/dotenv/mod.ts";

import "$std/dotenv/load.ts";


dotenv.loadSync({
    export: true 
});

await dev(import.meta.url, "./main.ts", config);
