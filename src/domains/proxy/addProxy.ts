import { ProxyModel } from "../../db/proxy/index";
import { initDatabase } from "../../db/init-database";

async function addProxy(
  name: String,
  login: String,
  password: String,
  proxy: String,
  host: String,
  port: Number
) {
  const newProxy = new ProxyModel({
    name,
    login,
    password,
    proxy,
    host,
    port,
  });

  await newProxy.save();
}

async function main() {
  await initDatabase({ main: true });

  const name = "test";
  const login = "test";
  const password = "test";
  const proxy = "46.101.124.11:8022";
  const host = "46.101.124.11";
  const port = 8022;

  await addProxy(name, login, password, proxy, host, port);
}

main().catch((error) => {
  console.error(error);
});
