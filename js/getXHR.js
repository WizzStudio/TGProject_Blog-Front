var asyncRequest = (function(){
	function handleReadyState(o,callback,url){
		o.onreadystatechange = function(){
			if(o.readyState === 4 && o.status === 200){
				callback(o,url);
			}
		}
	}

	var getXHR = function() {
		var http;
		try {
			http = new XMLHttpRequest();
			getXHR = function(){
				return new XMLHttpRequest();
			};
		}
		catch(e) {
			var msxml = ['MSXML2.XMLHTTP3.0','MSXML2.XMLHTTP','Micosoft.XMLHTTP'];
			for (var i = 0,len = msxml.length; i < len; i++){
				try{
					http = new ActiveXObjext(msxml[i]);
					getXHR = function(){
						return new ActiveXObjext(msxml[i]);
					};
					break;
				}
				catch(e){
					console.log('fucking Error');
				}
			}
		}
		return http;
	};

	return function(method,url,callback,postData){
		var http = getXHR();
		http.open(method,url,true);
		handleReadyState(http,callback,url);
		http.send(postData || null);
		return http;
	}
})();