import { cpSync, rmSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
cpSync("outputs", "dist", { recursive: true });

const config = {
  authBaseUrl: process.env.AIRBOARD_AUTH_BASE_URL || "",
  authRedirectUri: process.env.AIRBOARD_AUTH_REDIRECT_URI || "",
  kakaoMapJavaScriptKey: process.env.KAKAO_MAP_JAVASCRIPT_KEY || process.env.AIRBOARD_KAKAO_MAP_JAVASCRIPT_KEY || "9d567a6ad7d695707baa9c15623d8315",
  naverMapClientId: process.env.NAVER_MAP_CLIENT_ID || process.env.AIRBOARD_NAVER_MAP_CLIENT_ID || "",
  schoolLocationServiceKey: process.env.AIRBOARD_SCHOOL_LOCATION_SERVICE_KEY || "",
  schoolLocationApiUrl: process.env.AIRBOARD_SCHOOL_LOCATION_API_URL || "https://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api",
  schoolLocationPageSize: Number(process.env.AIRBOARD_SCHOOL_LOCATION_PAGE_SIZE || 1000),
  schoolLocationMaxPages: Number(process.env.AIRBOARD_SCHOOL_LOCATION_MAX_PAGES || 80),
  schoolStandardPublicDataPk: process.env.AIRBOARD_SCHOOL_STANDARD_PUBLIC_DATA_PK || "15021148",
  schoolStandardDetailPk: process.env.AIRBOARD_SCHOOL_STANDARD_DETAIL_PK || "uddi:9793c2f7-4dba-49ed-bf64-8c6cfd56102a",
  schoolFileMetaUrl: process.env.AIRBOARD_SCHOOL_FILE_META_URL || "https://www.data.go.kr/tcs/dss/selectFileDataDownload.do?recommendDataYn=Y",
  schoolFileDownloadUrl: process.env.AIRBOARD_SCHOOL_FILE_DOWNLOAD_URL || "https://www.data.go.kr/cmm/cmm/fileDownload.do"
};

writeFileSync("dist/config.js", `window.AIRBOARD_CONFIG = Object.freeze(${JSON.stringify(config, null, 2)});\n`);
