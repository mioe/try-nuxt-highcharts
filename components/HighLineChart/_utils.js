import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

/**
 * Constants
 */
export const UNITS = ['hour', 'day', 'month'];
export const DAYJS_FORMAT = 'YYYY-MM-DD HH:mm';
export const EVENT_LABELS = {
  enter: 'Посетители, зашедшие на сайт',
  click: 'Посетители, кликнувшие на виджет',
  dialog: 'Диалоги',
};
export const DEVICE_TYPES = ['mobile', 'desktop'];

/**
 * Methods
 */
export const getDayDiff = (dateRange) => {
  if (!dateRange) {
    throw new Error('🦕 dateRange is undefined');
  }
  const firstDate = dayjs(dateRange[0]);
  const diff = dayjs(dateRange[1]).diff(dateRange[0], 'day');
  return diff;
};
/**
 * getDiffDateArray (dateRange: string[] = ['1996-11-26', '1996-12-26'], unit: string = 'day')
 */
export const getDiffDateArray = (dateRange, unit) => {
  if (!dateRange || !unit) {
    throw new Error('🦕 dateRange or unit is undefined');
  }
  const firstDate = dayjs(dateRange[0]);
  const diff = dayjs(dateRange[1]).diff(dateRange[0], unit);
  const dates = [];
  for (let i = 0; i < diff + 1; i++) {
    const point = firstDate.add(i, unit);
    dates.push(point.format(DAYJS_FORMAT));
  }
  return dates;
};
/**
 * getDiffDateArray (items: events[], keyName: string = 'name', keys: string[] = ['click', 'enter', ...])
 */
export const getGroupedItemsViaKey = (items, keyName, keys) => {
  if (!items || !keyName || !keys) {
    throw new Error('🦕 items or keyName or keys is undefined');
  }
  const result = {};
  keys.forEach((key) => {
    result[`${key}`] = items.filter((item) => item[keyName] === key);
  });
  return result;
};
/**
 * getDiffDateArray (points: string[], items: events[], unit: string = 'day')
 */
export const getAllSeriesForOneType = (points, items, unit) => {
  if (!points || !items || !unit) {
    throw new Error('🦕 points or items or unit is undefined');
  }
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const j = i + 1;
    const startPoint = dayjs(points[i], DAYJS_FORMAT);
    const endPoint = dayjs(points[j], DAYJS_FORMAT);
    const itemsForThisBetween = items.filter((item) => {
      return dayjs(item.createdAt).isBetween(startPoint, endPoint, unit, '[)');
    });
    result.push(parseInt(itemsForThisBetween.length));
  }
  return result;
};

export class getLabelForTooltip {
  #points = []
  #unit = null

  constructor(points, unit) {
    this.#points = points
    this.#unit = unit
  }

  GET(idx) {
    const date = dayjs(this.#points[idx])
    return this.#unit !== UNITS[0]
      ? date.format('DD.MM.YYYY')
      : date.format('DD.MM.YYYY HH:mm')
  }
}

export default {};
