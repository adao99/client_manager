import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"],
  },
} satisfies Config;
