import { initDatabase } from "../../db/init-database";
import { Telegraf } from "telegraf";
import { Config } from "../config/index";
import { UserModel } from "../../db/user/index";
import { FindOneUserOptionsType } from "../../data/user/index";
import { HouseModel } from "../../db/house/index";
import { FindOneHouseOptionsType } from "../../data/house/index";
import { parseHouseInfo } from "../../../src/domains/krysha-parser/index";

function generateKrishaLink(adId: string): string {
  return `https://krisha.kz/a/show/${adId}`;
}

const telegramApiToken = Config.telegramApiToken;

const bot = new Telegraf(telegramApiToken);

(async () => {
  await initDatabase({ main: true });
})();

bot.command("start", async (ctx) => {
  const chatId = ctx.message.chat.id;
  const firstName = ctx.message.from.first_name;
  const lastName = ctx.message.from.last_name;
  const username = ctx.message.from.username;

  const findOneOptions: FindOneUserOptionsType = { chatId: chatId.toString() };
  const existingUser = await UserModel.findOne(findOneOptions);

  if (!existingUser) {
    let isParsing = false;
    await ctx.reply(`Добро пожаловать, ${firstName}!`);

    const user = new UserModel({
      chatId,
      firstName,
      lastName,
      username,
    });

    await user.save();
  } else {
    await ctx.reply(`Рад тебя видеть, ${existingUser.firstName}!`);
  }
  await ctx.reply("Введите ID объявления с сайта krisha.kz");
});

bot.on("text", async (ctx) => {
  let message = "";

  await ctx.reply("ID объявления получено.");
  const adId = ctx.message.text.trim();
  const krishaLink = generateKrishaLink(adId);

  const findOneOptions: FindOneHouseOptionsType = { adId };
  let existingHouse = await HouseModel.findOne(findOneOptions);

  if (!existingHouse) {
    await parseHouseInfo(krishaLink);
    existingHouse = await HouseModel.findOne(findOneOptions);
  }

  existingHouse
    ? await ctx.reply(
        `Заголовок: ${existingHouse.title}\n` +
          `${
            existingHouse.price.priceValue !== 0
              ? `Цена: ${existingHouse.price.priceValue.toLocaleString("ru")}${
                  existingHouse.price.priceUnit
                }\n`
              : ""
          }` +
          `${
            existingHouse.buildingType !== "Тип постройки не указан"
              ? `Тип постройки: ${existingHouse.buildingType}\n`
              : ""
          }` +
          `${
            existingHouse.yearBuilt !== 0
              ? `Год постройки: ${existingHouse.yearBuilt}\n`
              : ""
          }` +
          `${
            existingHouse.area.areaValue !== 0
              ? `Площадь дома: ${existingHouse.area.areaValue} ${existingHouse.area.areaUnit}\n`
              : ""
          }` +
          `${
            existingHouse.sectorArea.sectorAreaValue !== 0
              ? `Площадь участка: ${existingHouse.sectorArea.sectorAreaValue} ${existingHouse.sectorArea.sectorAreaUnit}\n`
              : ""
          }` +
          `${
            existingHouse.bathroom !== "Санузел не указан"
              ? `Санузел:${existingHouse.bathroom}\n`
              : ""
          }` +
          `${
            existingHouse.floor !== 0
              ? `Этаж квартиры: ${existingHouse.floor}\n`
              : ""
          }` +
          `${
            existingHouse.totalFloors !== 0
              ? `Этажность дома: ${existingHouse.totalFloors}\n`
              : ""
          }` +
          `Ссылка на объявление: ${krishaLink}`
      )
    : await ctx.reply("Данные по данному объявлению не найдены.");
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
