var showAuthor = (function(){
	function addAuthorNode(source,url){
		var li = document.createElement('li');
		var authorName = document.createElement('h4');
		let showAuthorUrl = url + '/' + source.id;

		authorName.innerHTML = source.name;
		authorName.addEventListener('click',function(){
			sessionStorage.setItem('showAuthorUrl',showAuthorUrl);
			location.href = "showAuthor.html";
		});
		li.appendChild(authorName);
		document.getElementById('authorList').appendChild(li);

	}
	return function(o,url){
		var source = JSON.parse(o.responseText);
		var counts = source.length;
		for(let i = 0; i < counts; i++){
			addAuthorNode(source[i],url);
		}
	}
})();