export function deepFreeze<T>(object: T) {
  const propertyNames = Object.getOwnPropertyNames(object);

  for (const name of propertyNames) {
    const value = object[name as keyof T];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
