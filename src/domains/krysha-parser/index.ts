import axios from "axios";
import cheerio from "cheerio";
import { HouseModel } from "../../db/house/index";

export async function parseHouseInfo(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const adId = url.split("/").pop();

    const titleElement = $(".offer__advert-title h1");
    const title =
      titleElement.length > 0
        ? titleElement.text().trim()
        : "Описание не указано";

    const priceString = $(".offer__price").text().trim().replace(/\D/g, "");
    const priceValue = parseInt(priceString) || 0;
    const priceUnit = $(".offer__price").text().trim().replace(/\s|\d/g, "");

    const buildingTypeElement = $(
      "div[data-name='flat.building'] .offer__advert-short-info"
    );
    const buildingType =
      buildingTypeElement.length > 0
        ? buildingTypeElement.text().trim()
        : "Тип постройки не указан";

    const yearBuildString = $(
      "div[data-name='house.year'] .offer__advert-short-info"
    )
      .text()
      .trim();
    const yearBuilt = parseInt(yearBuildString) || 0;

    const areaString = $(
      "div[data-name='live.square'] .offer__advert-short-info"
    )
      .text()
      .trim()
      .replace(/[^\d.]/g, "");
    const areaValue = parseFloat(areaString) || 0;
    const areaUnit = $("div[data-name='live.square'] .offer__advert-short-info")
      .text()
      .trim()
      .replace(/[^а-яА-ЯёЁ²]/g, "");

    const sectorAreaString = $(
      "div[data-name='land.square'], div[data-name='land.square_a'] .offer__advert-short-info"
    )
      .text()
      .trim()
      .replace(/[^\d.]/g, "");
    const sectorAreaValue = parseFloat(sectorAreaString) || 0;
    const sectorAreaUnit = $(
      "div[data-name='land.square'], div[data-name='land.square_a'] .offer__advert-short-info"
    )
      .text()
      .trim()
      .replace(/[^а-яА-ЯёЁ²]/g, "");

    const bathroomElement = $(
      "div[data-name='flat.toilet'] .offer__advert-short-info"
    );
    const bathroom =
      bathroomElement.length > 0
        ? bathroomElement.text().trim()
        : "Санузел не указан";

    const floorInfoString = $(
      '.offer__info-item[data-name="flat.floor"] .offer__advert-short-info'
    )
      .text()
      .trim();
    const [floorString, totalFloorsString] = floorInfoString.split(" из ");
    const floor = parseInt(floorString) || 0;
    const totalFloors = parseInt(totalFloorsString) || 0;

    const house = new HouseModel({
      adId,
      title,
      price: { priceValue, priceUnit },
      buildingType,
      yearBuilt,
      area: { areaValue, areaUnit },
      sectorArea: { sectorAreaValue, sectorAreaUnit },
      bathroom,
      floor,
      totalFloors,
    });

    await house.save();

    console.log("House info saved:", house);
  } catch (error) {
    console.error("Error parsing house info:", error);
  }
}
