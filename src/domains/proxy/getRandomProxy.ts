import { ProxyModel } from "../../db/proxy/index";
import { initDatabase } from "../../db/init-database";

export async function getRandomProxy() {
  await initDatabase({ main: true });

  const proxies = await ProxyModel.find();
  const randomIndex = Math.floor(Math.random() * proxies.length);
  const proxy = proxies[randomIndex];

  return proxy;
}
