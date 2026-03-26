type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassArray = ClassValue[];
type ClassValue = string | number | null | false | undefined | ClassDictionary | ClassArray;

function toClassString(value: ClassValue): string {
  if (!value) {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toClassString).filter(Boolean).join(' ');
  }

  if (typeof value === 'object') {
    return Object.keys(value)
      .filter((key) => Boolean(value[key]))
      .join(' ');
  }

  return '';
}

export default function clsx(...values: ClassValue[]): string {
  return values
    .map(toClassString)
    .filter(Boolean)
    .join(' ');
}