var addArticle = (function(){
	function addArticleNode(source,url){
		var artcle = document.createElement('div');	//文章
		var title = document.createElement('h4');	//文章标题
		var info = document.createElement('div');	//文章信息
		var infoTime = document.createElement('span');
		var infoViews = document.createElement('span');
		var infoAuthorMore = document.createElement('a');
		var infoCatologMore = document.createElement('a');
		var infoCatolog = document.createElement('span');
		var infoAuthor = document.createElement('span');
		var content = document.createElement('div');
		var buttonDiv = document.createElement('div');
		var button = document.createElement('button');
		var hr = document.createElement('hr');
		var space = document.createElement('br');
		let showArticleUrl = url + '/'+ source.id;
		let showAuthorUrl =  "http://blog.helloyzy.cn/users/" + source.user_id;
		let showTagUrl = "http://blog.helloyzy.cn/tags/" + source.tag_id;
		title.innerHTML = source.name;
		title.classList.add('centerPosition');
		artcle.appendChild(title);
		info.classList.add('centerPosition');

		infoViews.innerHTML = "&emsp;" + "阅读量:&emsp;" + source.view;
		infoCatolog.innerHTML = "&emsp;"+"类别:"  + "&emsp;";
		infoCatologMore.innerHTML = source.tag.name;
		infoAuthorMore.classList.add('info');
		infoCatologMore.classList.add('info');
		infoCatolog.appendChild(infoCatologMore);
		infoCatologMore.addEventListener('click',function(){
			sessionStorage.setItem('showTagUrl',showTagUrl);
			location.href = 'showTag.html';
			//将id存在sessction中，点击后加载标签栏下的信息
		});

		infoAuthorMore.innerHTML = source.user.name;
		infoAuthor.innerHTML = "&emsp;" + "作者:" + "&emsp;";
		infoAuthor.appendChild(infoAuthorMore);
		infoAuthor.addEventListener('click',function(){
			sessionStorage.setItem('showAuthorUrl',showAuthorUrl);
			location.href = "showAuthor.html";
			//将作者id存在sessition中，点击后加载作者信息
		})

		infoTime.innerHTML = "发表于: " + source.created_at + "&emsp;";
		info.appendChild(infoTime);
		info.appendChild(infoViews);
		info.appendChild(infoCatolog);
		info.appendChild(infoAuthor);
		info.appendChild(infoViews);

		//将md转为html
		var converter = new showdown.Converter();
		var contentBody = converter.makeHtml(source.md_content);
		content.innerHTML = contentBody;

		button.innerHTML = "阅读全文>>>";
		button.classList.add('btn','btn-default');
		button.addEventListener('click',function(){
			sessionStorage.setItem('author',source.user.name);
			sessionStorage.setItem('view',source.view);
			sessionStorage.setItem('tagName',source.tag.name);
			sessionStorage.setItem('showArticleUrl',showArticleUrl);
			location.href = 'showArticle.html';
		});
		buttonDiv.appendChild(button);
		buttonDiv.style.textAlign = "right";

		artcle.appendChild(title);
		artcle.appendChild(info);
		artcle.appendChild(space);
		artcle.appendChild(content);
		artcle.appendChild(buttonDiv);
		artcle.appendChild(hr);

		if(document.getElementById('articles')){
			document.getElementById('articles').appendChild(artcle);
		} else if(document.getElementById('showContent')){
			document.getElementById('showContent').appendChild(artcle);
		}
	}
	function setPageUrl(source){
		sessionStorage.setItem('next_page_url',source.next_page_url);
		sessionStorage.setItem('prev_page_url',source.prev_page_url);
		sessionStorage.setItem('first_page_url',source.first_page_url);
		sessionStorage.setItem('last_page_url',source.last_page_url);
	}

	return function(o,url){
		var source = JSON.parse(o.responseText);
		var counts = source.data.length;
		setPageUrl(source);
		for(let i = counts - 1; i >= 0; i--){
			addArticleNode(source.data[i],url);
		}
	}
})();
