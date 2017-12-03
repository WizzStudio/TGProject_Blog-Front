var showArticle = (function(){
	function showArticleNode(source){
		var artcle = document.createElement('div');	//文章
		var title = document.createElement('h1');	//文章标题
		var info = document.createElement('small');	//文章信息
		var infoTime = document.createElement('span');
		var infoViews = document.createElement('span');
		var infoCatolog = document.createElement('span');
		var infoAuthor = document.createElement('span');
		var content = document.createElement('div');
		var hr = document.createElement('hr');


		title.innerHTML = source.name;
		title.classList.add('centerPosition');
		artcle.appendChild(title);


		infoViews.innerHTML = + " 阅读量:" + source.view;
		infoCatolog.innerHTML = "&emsp;"+"类别:" + "Web前端" + "&emsp;";
		infoCatolog.addEventListener('click',function(){
			//将id存在sessction中，点击后加载分类栏下的信息
		});



		alert(source.user);
		infoAuthor.innerHTML = "作者:"  + "&emsp;";
		infoAuthor.addEventListener('click',function(){
			alert("前往作者");
			//将作者id存在sessition中，点击后加载作者信息
		})

		infoTime.innerHTML = "发表于: " + source.created_at;
		info.appendChild(infoTime);
		info.appendChild(infoViews);
		info.appendChild(infoCatolog);
		info.appendChild(infoAuthor);
		info.appendChild(infoViews);

		//将md转为html
		var converter = new showdown.Converter();
		var contentBody = converter.makeHtml(source.md_content);
		content.innerHTML = contentBody;
		

		artcle.appendChild(title);
		artcle.appendChild(info);
		artcle.appendChild(hr);
		artcle.appendChild(content);

		document.getElementById('showArticle').appendChild(artcle);	
	}

	return function(o){
		var source = JSON.parse(o.responseText);
		showArticleNode(source);
	}		
})();