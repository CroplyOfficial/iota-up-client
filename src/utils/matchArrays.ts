const compareArrays = (array1: any[], array2: any[]) => {
  const matches: any[] = [];
  array1.forEach((item1) => {
    array2.forEach((item2) => {
      if (item1 === item2) {
        matches.push(item1);
      }
    });
  });
  return matches;
};

export { compareArrays };
