export const getYMDToMilliseconds = ( dateYMD ) => {
  if (typeof dateYMD === 'number') return dateYMD;
  let date = dateYMD.split('-');
  date = date.map(each => {
    return each[0] === '0' ? each.split('0'):each;
  })
  
  return new Date( date.join('-') ).getTime();
}