
// ================== INTRO BASIC NODE.JS

// const fs = require('node:fs');

// fs.copyFileSync("file1.txt","file2.txt");

// ================== NPM PACKAGE SUPERHERO NAME

// const superheroes = require('superheroes');

// var namessuperheroNaes = superheroes.all;
//=> ['3-D Man', 'A-Bomb', …]

// var randomNames = superheroes.random();
//=> 'Spider-Ham'

// ================== NPM PACKAGE SUPER VILLAIN NAME

const supervillains = require('supervillains');

var namesSuperVillaine = supervillains.random();

console.log(namesSuperVillaine);