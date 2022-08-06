import numeral from "numeral";
import * as _ from "lodash";

export function formatNumberLarge(number) {
  return numeral(number).format("0,0");
}

export function formatNumberShortest(number) {
  if (number < 1000) {
    return number;
  }
  return Math.round(number / 1000) + "k";
}

export function formatNumberLargeDecimal(number) {
  if (_.isNil(number)) return null;
  return numeral(number).format("0,0.00");
}

export function numFormatNumberLargeDecimal(number) {
  if (_.isNil(number)) return null;
  return Number(numeral(number).format("0,0.00"));
}

export function numFormatNumberDecimal(number) {
  if (_.isNil(number)) return null;
  return Number(numeral(number).format("0.00"));
}

export function formatMoneyDollar(money = 0) {
  if (money === 0) {
    return numeral(money).format("$0,0.00");
  }
  return numeral(money).format("$0,0.00");
}

export function formatTaxRateMoneyDollar(money = 0) {
  return numeral(money).format("$0,0.00");
}

export function formatMoneyDollarInteger(money = 0) {
  return numeral(money).format("$0,0");
}
