const express = require("express");
const puppeteer = require("puppeteer");

const server = express();

server.get("", async (request, response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.globo.com/");

  const dimensions = await page.evaluate(() => {
    return {
      subtitle: document.querySelector(".post__title").innerHTML,
    };
  });

  await browser.close();
  response.send({
    subtitle: dimensions.subtitle,
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor subiu na porta ${port}`);
});
