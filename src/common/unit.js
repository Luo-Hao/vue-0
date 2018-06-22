/**
 * Created by hao.luo on 2018/5/21.
 */
exports.saveLocalItem = function(key, value) {
  localStorage.setItem(key, value)
}

exports.getLocalItem = function(key) {
  return localStorage.getItem(key)
}

exports.removeLocalItem = function(key) {
  return localStorage.removeItem(key)
}
