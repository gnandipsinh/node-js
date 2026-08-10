const fs = require("fs");

fs.writeFileSync("gm.txt", "file is created by gnandipsinh");

fs.writeFileSync("gm.mp4", "file is created by gnandipsinh");

fs.writeFileSync("gm.pdf", "file is created by gnandipsinh");

fs.writeFileSync("gm.doc", "file is created by gnandipsinh");

const data = fs.readFileSync("gm.txt", "utf-8");

const data1 = fs.readFileSync("gm.mp4", "utf-8");

const data2 = fs.readFileSync("gm.pdf", "utf-8");

const data3 = fs.readFileSync("gm.doc", "utf-8");

console.log(data);

console.log(data1);

console.log(data2);

console.log(data3);
