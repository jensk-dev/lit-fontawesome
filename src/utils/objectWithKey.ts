export function objectWithKey(key: string | number, value: unknown) {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {};
}
