/**
 * Parse query String into object with key as the query and the value as the
 * value
 *
 * @param querystring
 * @returns {Object} QeuryString object with everything in key value pairs
 */

const parseQueryString = (querystring: string) => {
  if (querystring) {
    const queryObject = new Object();
    const queryString = querystring.split("?")[1];
    const queryStringSplit = queryString.split("&");
    queryStringSplit.map((query: string) => {
      // @ts-ignore
      queryObject[query.split("=")[0]] = query.split("=")[1];
    });
    return queryObject;
  } else {
    return {};
  }
};

export { parseQueryString };
