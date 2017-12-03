var showTag = (function(){
	function addTagNode(source,url){
		var kind = document.createElement('div');
		var li = document.createElement('li');
		var tagName = document.createElement('h4');

		tagName.innerHTML = source.name;
		tagName.addEventListener('click',function(){
			sessionStorage.setItem('ShowTagUrl',url + source.id);
			location.href = 'showTag.html';
		});
		li.appendChild(tagName);
		document.getElementById('tagList').appendChild(li);
	}
	return function(o,url){
			var source = JSON.parse(o.responseText);
			var counts = source.length;
			for(let i = 0; i < counts; i++){
				addTagNode(source[i]);
			}
		}
})();