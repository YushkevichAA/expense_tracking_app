// форматирование данных по сумме
export function formatMoney(value: number) {
  return `${Number(value).toLocaleString("ru-RU")} ₽`;
}
