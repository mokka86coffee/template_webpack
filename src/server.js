const fs = require('fs');
const path = require('path');
const express = require('express');
const app = new express();

const pathToHtmlFile = path.resolve(process.cwd(), 'dist', 'index.html');
const pathToStatic = path.resolve(process.cwd(), 'dist');

app.get('/', (req, res) => {
   const contentHtml = fs.readFileSync(pathToHtmlFile, 'utf-8');
   res.send(contentHtml);
});

app.use('/static', express.static(pathToStatic));

app.listen(2000);
