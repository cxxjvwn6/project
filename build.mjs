import { cpSync, rmSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
cpSync("outputs", "dist", { recursive: true });

const config = {
  authBaseUrl: process.env.AIRBOARD_AUTH_BASE_URL || "",
  authRedirectUri: process.env.AIRBOARD_AUTH_REDIRECT_URI || "",
  schoolLocationServiceKey: process.env.AIRBOARD_SCHOOL_LOCATION_SERVICE_KEY || "",
  schoolLocationApiUrl: process.env.AIRBOARD_SCHOOL_LOCATION_API_URL || "https://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api",
  schoolLocationPageSize: Number(process.env.AIRBOARD_SCHOOL_LOCATION_PAGE_SIZE || 5000),
  schoolLocationMaxPages: Number(process.env.AIRBOARD_SCHOOL_LOCATION_MAX_PAGES || 80)
};

writeFileSync("dist/config.js", `window.AIRBOARD_CONFIG = Object.freeze(${JSON.stringify(config, null, 2)});\n`);
