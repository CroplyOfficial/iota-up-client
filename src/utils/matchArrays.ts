/**
 * Checks for all the matching items in a pair of arrays and returns
 * all the matches.
 *
 * @param {any[]} array1
 * @param {any[]} array2
 * @returns {any[]} matches
 */

const compareArrays = (array1: any[], array2: any[]): any[] => {
  const matches: any[] = [];
  array1.forEach((item1) => {
    array2.forEach((item2) => {
      if (decodeURI(item1.toLowerCase()) === decodeURI(item2.toLowerCase())) {
        matches.push(item1);
      }
    });
  });
  return matches;
};

export { compareArrays };
