// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_process_input from "./routes/api/process-input.ts";
import * as $api_register from "./routes/api/register.ts";
import * as $index from "./routes/index.tsx";
import * as $EmojiInput from "./islands/EmojiInput.tsx";
import * as $EmojiListing from "./islands/EmojiListing.tsx";
import * as $EmojiTab from "./islands/EmojiTab.tsx";
import * as $MovieLabel from "./islands/MovieLabel.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/process-input.ts": $api_process_input,
    "./routes/api/register.ts": $api_register,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/EmojiInput.tsx": $EmojiInput,
    "./islands/EmojiListing.tsx": $EmojiListing,
    "./islands/EmojiTab.tsx": $EmojiTab,
    "./islands/MovieLabel.tsx": $MovieLabel,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
