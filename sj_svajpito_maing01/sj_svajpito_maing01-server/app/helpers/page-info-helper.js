"use strict";
class PageInfoHelper {
  getDefaultPageInfo(dtoInPageInfo, defaultPageSize = 1000, defaultPageIndex = 0) {
    let pageInfo;
    if (dtoInPageInfo) {
      pageInfo = { ...dtoInPageInfo };
    } else {
      pageInfo = {};
    }
    pageInfo.pageSize = pageInfo.pageSize || defaultPageSize;
    pageInfo.pageIndex = pageInfo.pageIndex || defaultPageIndex;

    return pageInfo;
  }
}

module.exports = new PageInfoHelper();
