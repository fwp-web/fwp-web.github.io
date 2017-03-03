function getElesByClass(classname, parent) {
	var eles = [], rs = [], index = 0, oparent = document;
	if(parent) {
		oparent = document.getElementById(parent);
    }
    eles = oparent.getElementsByTagName("*");
	for(var i=0; i<eles.length; i++) {
		if(eles[i].className == classname) {
            rs[index++] = eles[i];
		}
	}
	return rs;
}