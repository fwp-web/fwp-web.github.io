//飞船类
var Spaceship = function(orbit) {
	this.status = 0;      //飞行状态为1，停止状态为0
	this.energy = 100;
	this.orbit = orbit;   //行星轨道，分别取值0、1、2、3
	this.destroyed = false;
}
Spaceship.prototype = {
	self: this, 
	//动力系统
	dirve: {
		//开始飞行
		start: function() {
			if(self.energy > 0) {
				self.status = 1;
			}	
		}, 
		//停止飞行
		stop: function() {
			self.status = 0;
		}, 
		//飞行
		fly: function() {
			if(self.status === 1) {
				
			}
		}
	}, 
}