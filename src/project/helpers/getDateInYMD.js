export const getDateInYMD = ( dateInMilliseconds ) => {
  if (typeof dateInMilliseconds !== 'number') return dateInMilliseconds;
  let newDate = new Date( dateInMilliseconds ).toLocaleDateString().split('/');
  const [month, day] = newDate;
  newDate[0] = day;
  newDate[1] = month;
  newDate = newDate.reverse().map(each => {
    return each.length === 1 ? `0${each}`:each;
  })

  return newDate.join('-');
}