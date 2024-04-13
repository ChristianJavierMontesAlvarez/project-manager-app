export const getSubstring = (text, start, end) => {
  return text?.length <= end ? text:`${ text?.substring(start, end) }...`;
}