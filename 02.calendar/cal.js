#! /usr/bin/env node

import minimist from "minimist";

// ターミナルからの入力をminimistで取得
const inputTime = minimist(process.argv.slice(2));
const inputMonth = inputTime["m"];
const inputYear = inputTime["y"];

// 入力が整数かどうか,最小、最大値の範囲かを判定する
function validateInteger(value, min, max) {
  // 整数以外の場合（負の整数は型がbooleanになるのでこちらになる）
  if (!Number.isInteger(value)) {
    throw new Error("値は整数で入力してください");
  }
  // 範囲外の場合
  if (value < min || value > max) {
    throw new Error(`値は${min}~${max}の範囲で入力してください`);
  }
  return value;
}

// 入力が存在した時はvalidateを実行し、入力がない時は現在の月を取得
const month = inputMonth
  ? validateInteger(inputMonth, 1, 12)
  : new Date().getMonth() + 1;

// 入力が存在した時はvalidateを実行し、入力がない時は現在の年を取得
const year = inputYear
  ? validateInteger(inputYear, 1970, 2100)
  : new Date().getFullYear();

console.log(month);
console.log(year);
