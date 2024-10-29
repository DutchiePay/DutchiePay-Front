import { CATEGORIES } from './constants';

export default function getCategoryNames(categories) {
  if (categories === undefined) return null;
  return categories
    .map(
      (cat) =>
        Object.keys(CATEGORIES).find((key) => CATEGORIES[key] === cat) || cat
    )
    .join(', ');
}
