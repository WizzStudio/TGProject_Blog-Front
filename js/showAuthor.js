var showAuthorMore = (function(){
	function showMoreInfo(source){
		var authorName = document.createElement('div');
		var authorEmail= document.createElement('div');
		var authorUrl = document.createElement('div');
		var authorGithub = document.createElement('div');

		authorName.innerHTML = source.name;
		authorEmail.innerHTML = "Email:" + "&emsp;" + source.email;
		authorUrl.innerHTML = "url:" + "&emsp;" + source.url;
		authorGithub.innerHTML = "github:" + "&emsp;" + source.github;

		var authorInfoList = document.getElementById('authorInfoList');

		authorInfoList.appendChild(authorName);
		authorInfoList.appendChild(authorEmail);
		authorInfoList.appendChild(authorGithub);
		authorInfoList.appendChild(authorUrl);

	}

	function showMoreArticles(source){
		var authorArticlesList = document.getElementById('authorArticlesList');
		var articleName = document.createElement('div');
		var articleTag = document.createElement('div');
		var space = document.createElement('br');
		articleTag.innerHTML = "Tag:&emsp;" + source.tag.name;
		articleName.innerHTML = "Name:&emsp;" + source.name;

		authorArticlesList.appendChild(articleName);
		authorArticlesList.appendChild(articleTag);
		authorArticlesList.appendChild(space);

	}
	return function(o){
		var source = JSON.parse(o.responseText);
		showMoreInfo(source.userInfo);
		for(let i = 0; i < source.articles.data.length; i++)
			showMoreArticles(source.articles.data[i]);
	}
})();