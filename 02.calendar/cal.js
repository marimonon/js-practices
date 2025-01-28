#! /usr/bin/env node

import minimist from "minimist";

const inputTime = minimist(process.argv.slice(2));

console.log(inputTime);
