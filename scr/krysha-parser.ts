import { parseHouseInfo } from "../scr/domains/krysha-parser/index";
import connectToDatabase from "../scr/db/index";

connectToDatabase();

const url = "https://krisha.kz/a/show/681426253";
parseHouseInfo(url);
