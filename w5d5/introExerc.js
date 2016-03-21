function Clock() {
  this.myTime = new Date();
  // this.myHours = this.myTime.getHours;
  // this.myMinutes = this.myTime.getMinutes;
  // this.mySeconds = this.myTime.getSeconds;

}
Clock.prototype.outputTime = function() {
  var Hours = this.myTime.getHours();
  if (Hours < 10) {
    Hours = "0" + Hours;
  }
  var Minutes = this.myTime.getMinutes();
  if (Minutes < 10) {
    Minutes = "0" + Minutes;
  }
  var Seconds = this.myTime.getSeconds();
  if (Seconds < 10) {
    Seconds = "0" + Seconds;
  }

  return "" + Hours + ":" + Minutes + ":" + Seconds;
};
Clock.prototype.tick = function() {
  this.myTime.setSeconds(this.myTime.getSeconds() + 1);
};

var ourClock = new Clock();
var i = true;
setInterval(function() {
  ourClock.tick.call(ourClock);
  var curTime = ourClock.outputTime.call(ourClock);
  console.log('\033[2J');
  console.log(curTime);
}, 1000);
