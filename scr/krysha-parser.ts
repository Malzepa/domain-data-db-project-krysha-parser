import { parseHouseInfo } from "../scr/domains/krysha-parser/index";
import { initDatabase } from "./db/init-database";

const start = async (): Promise<void> => {
  const url = "https://krisha.kz/a/show/681426253";
  await parseHouseInfo(url);
};

(async () => {
  await initDatabase({ main: true });
  await start();
})();
