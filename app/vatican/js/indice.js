function up() {
nome=window.location.href;
punto=nome.lastIndexOf(".");
suffisso=nome.substring(punto-2, punto);
if (suffisso=="it"||suffisso=="fr"||suffisso=="sp"||suffisso=="ge"||suffisso=="po") {
	
	window.location="../index_"+suffisso+".htm"
	}
	else
	{		
	window.location="../index.htm"
	}

}
