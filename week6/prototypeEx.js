Function.prototype.inherits = function(pClass){
  function Surgate() {}
  Surgate.prototype = pClass.prototype;
  this.prototype = new Surgate;

};
