var showTag = (function(){
	function showTagTitle(title){
		document.getElementById('tagTitle').innerHTML = title;
	}
	function showTagNode(source){
		var li = document.createElement('li');
		var articleTitle = document.createElement('h4');
		var articleAhthor = document.createElement('span');

		articleAhthor = source.user.name;
		articleTitle = source.name;

		document.getElementById('showTagList').appendChild(articleTitle);
		document.getElementById('showTagList').appendChild(articleAhthor);
	}

	return function(o){
		var source = JSON.parse(o.responseText);
		showTagTitle(source.tagInfo.name);
		for(let i = 0; i < source.articles.per_page; i++){
			showTagNode(source.articles.data[i]);
		}
	}
})();