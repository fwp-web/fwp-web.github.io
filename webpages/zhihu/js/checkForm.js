function generateCode() {
	var codes = ["A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
	              "O", "P", "Q","R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
	              0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
	    codeIndex = 0, 
	    len = codes.length, 
	    showCode = document.getElementById("showCode");
	    showCode.innerHTML = "";
	for(var i=0; i<4; i++) {
		codeIndex = Math.floor(Math.random()*len);
        showCode.innerHTML += codes[codeIndex];
	}
}
function checkForm() {

}