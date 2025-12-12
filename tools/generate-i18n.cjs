#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const pages = [
  "navbar",
  "home",
  "about",
  "whyUs",
  "collections",
  "csr",
  "news",
  "careers",
  "contact",
  "footer",
  "floatMessage",
  "articleNavigation",
];

const languages = ["en", "id"];
const baseDir = path.join(process.cwd(), "src/i18n");

function createStructure() {
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  languages.forEach((lang) => {
    const langDir = path.join(baseDir, lang);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir);

    pages.forEach((page) => {
      const filePath = path.join(langDir, `${page}.json`);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "{}");
        console.log("Created:", filePath);
      }
    });
  });

  console.log("\n✔ I18n folder + files generated successfully!");
}

createStructure();
