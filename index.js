let LazyLoad = function() {}

LazyLoad.prototype._domList = document.querySelectorAll('.lazy')

LazyLoad.prototype.init = function(options) {
  let arr = LazyLoad._domList
  arr.forEach((item) => {
    item.src = options.src
  })
  windowScroll(arr)
  windowResize(arr)
}

/**
 * @param {Array} arr 
 */
function windowScroll( arr ) {
  window.addEventListener('scroll', scrollMethod(arr))
}

/**
 * @param {Array} arr 
 */
function windowResize(arr) {
  window.removeEventListener('scroll', scrollMethod)
  windowScroll(arr)
}

/**
 * @param {Array} arr 
 */
function scrollMethod(arr) {
  arr.forEach((item) => {
    if (isNeedDeal(item)) {
      item.src = item.getAttribute('data-src')
    }
  })
}

/**
 * @returns {Object}
 */
function getClientView() {
  let obj = {}
  let left = document.documentElement.scrollLeft || document.body.scrollLeft
  let top = document.documentElement.scrollTop || document.body.scrollTop
  let width = document.documentElement.clientWidth
  let height = document.documentElement.clientHeight
  return Object.assign(obj, {left, top, width, height})
}

/**
 * @param {Dom} dom 
 * @returns {Object}
 */
function getDomView(dom) {
  let obj = {}
  let width = dom.offsetWidth
  let height = dom.offsetHeight
  let left = 0
  let top = 0
  while(dom.offsetParent) {
    left = left + dom.offsetLeft
    top = left + dom.offsetTop
    dom = dom.offsetParent
  }
  return Object.assign(obj, {left, top, width, height})
}

/**
 * @param {Object} clientObj 
 * @param {Object} domObj 
 */
function isInView(clientObj, domObj) {
  let clientViewTop = clientObj.top + clientObj.height
  let domViewTop = domObj.top + domObj.height
  let clientViewLeft = clientObj.left + clientObj.width
  let domViewLeft = domObj.left + domObj.width
  return (domObj.top < clientViewTop && domViewTop < clientObj.top) 
          || (domObj.left < clientViewLeft && domViewLeft < clientObj.left)
}

/**
 * @param {Dom} item 
 */
function isNeedDeal(item) {
  let domObj = getDomView(item)
  let clientObj = getClientView(item)
  return isInView(clientObj, domObj)
}

export default LazyLoad