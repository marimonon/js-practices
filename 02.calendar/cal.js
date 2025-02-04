#! /usr/bin/env node

import minimist from "minimist";
import { DateTime } from "luxon";

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

// 現在の日付を取得
const date = DateTime.now();

// 入力が存在した時はvalidateを実行し、入力がない時は現在の月を取得
const sellectMonth = inputMonth
  ? validateInteger(inputMonth, 1, 12)
  : date.month;

// 入力が存在した時はvalidateを実行し、入力がない時は現在の年を取得
const sellectYear = inputYear
  ? validateInteger(inputYear, 1970, 2100)
  : date.year;

// 選択された(もしくは現在の）月の日数を取得
const sellectDays = DateTime.fromObject({
  year: sellectYear,
  month: sellectMonth,
}).daysInMonth;

// 選択された(もしくは現在の）1日目の曜日を取得
const sellectFirstDay = DateTime.fromObject({
  year: sellectYear,
  month: sellectMonth,
  day: 1,
}).weekday;

// 最初の土曜日の日付を取得
const firstSaturday = 6 - sellectFirstDay + 1;

// 土曜日かどうかを判定
const isSaturday = (day) => (day - firstSaturday) % 7 === 0;

// カレンダーの出力
// 年月の部分
process.stdout.write(`      ${sellectMonth}月 ${sellectYear}年\n`);

// 曜日の部分
process.stdout.write("日 月 火 水 木 金 土\n");

// 最初のスペース
process.stdout.write(" ".repeat(sellectFirstDay * 3));

