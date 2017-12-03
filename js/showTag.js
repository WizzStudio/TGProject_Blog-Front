var showTagArticles = (function(){
	function showTagTitle(title){
		document.getElementById('tagTitle').innerHTML = "Tag:&emsp;" + title || '';
	}

	function showTagNode(source){
		var li = document.createElement('li');
		var articleTitle = document.createElement('span');
		var articleAhthor = document.createElement('span');
		var showTagList = document.getElementById('showTagList');

		var showArticleUrl = "http://blog.helloyzy.cn/articles/" + source.id;
		var showAuthorUrl = "http://blog.helloyzy.cn/users/" + source.user.id;


		articleAhthor.innerHTML =source.user.name + "&emsp;";
		articleTitle.innerHTML = "《" + source.name + "》";

		articleTitle.addEventListener('click',function(){
			sessionStorage.setItem('showArticleUrl',showArticleUrl);
			location.href = 'showArticle.html';
		});

		articleAhthor.addEventListener('click',function(){
			sessionStorage.setItem('showAuthorUrl',showAuthorUrl);
			location.href = "showAuthor.html";
		});

		li.appendChild(articleTitle);
		li.appendChild(articleAhthor);
		showTagList.appendChild(li);
	}

	return function(o){
		var source = JSON.parse(o.responseText);
		showTagTitle(source.tagInfo.name);
		for(let i = 0; i < source.articles.per_page; i++){
			showTagNode(source.articles.data[i]);
		}
	}
})();