const defaultItemPerPage = 15

module.exports = function nPage(nItem, itemPerPage = defaultItemPerPage) {
  return Math.max(nPage = Math.ceil(nItem / itemPerPage), 1)
}
