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
const selectMonth = inputMonth
  ? validateInteger(inputMonth, 1, 12)
  : date.month;

// 入力が存在した時はvalidateを実行し、入力がない時は現在の年を取得
const selectYear = inputYear
  ? validateInteger(inputYear, 1970, 2100) // 課題の指定どおり、1970〜2100年で動作させる
  : date.year;

// 選択された(もしくは現在の）月の日数を取得
const selectDays = DateTime.fromObject({
  year: selectYear,
  month: selectMonth,
}).daysInMonth;

// 選択された(もしくは現在の）1日目の曜日を取得
const selectFirstDay = DateTime.fromObject({
  year: selectYear,
  month: selectMonth,
  day: 1,
}).weekday;

// 最初の土曜日の日付を取得
const DAYS_OF_WEEK = 7;
const firstSaturday = DAYS_OF_WEEK - (selectFirstDay % DAYS_OF_WEEK);

// 土曜日かどうかを判定
const isSaturday = (day) => (day - firstSaturday) % DAYS_OF_WEEK === 0;

// 1桁の日付にスペースを追加
const twoDigits = (day) => day.toString().padStart(2, " ");

// カレンダーの出力

// 年月の部分
process.stdout.write(`      ${selectMonth}月 ${selectYear}年\n`);

// 曜日の部分
process.stdout.write("日 月 火 水 木 金 土\n");

// 最初のスペース
process.stdout.write("   ".repeat(selectFirstDay % DAYS_OF_WEEK));

// 日付の部分
for (let i = 1; i <= selectDays; i++) {
  // 2桁に変換後スペースを追加
  process.stdout.write(`${twoDigits(i)} `);
  // 土曜日で改行
  if (isSaturday(i)) {
    process.stdout.write("\n");
  }
}

// 最後改行する
process.stdout.write("\n");
