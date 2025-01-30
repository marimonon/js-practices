#! /usr/bin/env node

import minimist from "minimist";

// ターミナルからの入力をminimistで取得
const inputTime = minimist(process.argv.slice(2));
const inputMonth = inputTime["m"];

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

console.log(validateInteger(inputMonth, 1, 12));
