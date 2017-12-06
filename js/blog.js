var app = (function(){
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
		}

		return function(method,url,callback,postData){
			var http = getXHR();
			http.open(method,url,true);
			handleReadyState(http,callback,url);
			http.send(postData || null);
			return http;
		}
	})();
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
			});

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
				setTimeout(function(){
					location.href = 'showArticle.html';
				},800);
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
	var showArticle = (function(){
		function showArticleNode(source){
			var artcle = document.createElement('div');	//文章
			var title = document.createElement('h3');	//文章标题
			var info = document.createElement('div');	//文章信息
			var infoTime = document.createElement('span');
			var infoTimeMore = document.createElement('span');

			var infoTimeIcon = document.createElement('i');
			var infoViews = document.createElement('span');
			var infoCatolog = document.createElement('span');
			var infoCatologIcon = document.createElement('i');
			var infoAuthorMore  = document.createElement('a');
			var infoCatologMore = document.createElement('a');


			var infoAuthor = document.createElement('span');
			var content = document.createElement('div');
			var hr = document.createElement('hr');
			let showAuthorUrl =  "http://blog.helloyzy.cn/users/" + source.user_id;
			let showTagUrl = "http://blog.helloyzy.cn/tags/" + source.tag_id;

			infoCatologIcon.classList.add('fa','fa-fw','fa-tags');
			title.innerHTML = source.name;
			title.classList.add('centerPosition');
			artcle.appendChild(title);

			infoCatologMore.innerHTML = sessionStorage.getItem('tagName') || 'fuckError';
			infoAuthorMore.innerHTML = sessionStorage.getItem('author') || 'fuckError';
			infoViews.innerHTML =  "&emsp;" + "阅读量:" + sessionStorage.getItem('view');
			infoCatolog.appendChild(infoCatologIcon);
			infoCatolog.appendChild(infoCatologMore);

			infoCatologMore.addEventListener('click',function(){
				sessionStorage.setItem('showTagUrl','http://blog.helloyzy.cn/tags/' + source.tag_id);
				location.href = "showTag.html";
			});

			infoAuthor.innerHTML = "&emsp;" + "作者: ";
			infoAuthor.appendChild(infoAuthorMore);
			infoAuthorMore.addEventListener('click',function(){
				sessionStorage.setItem('showAuthorUrl',showAuthorUrl);
				location.href = "showAuthor.html";
			//将作者id存在sessition中，点击后加载作者信息
			});
			infoAuthorMore.classList.add('info');
			infoCatologMore.classList.add('info');
			infoTimeMore.innerHTML = source.created_at + "&emsp;";
			infoTimeIcon.classList.add('fa','fa-calendar-o');
			infoTime.appendChild(infoTimeIcon);
			infoTime.appendChild(infoTimeMore);

			info.classList.add('centerPosition');
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
	var showTag = (function(){
		function addTagNode(source,url){
			var kind = document.createElement('div');
			var li = document.createElement('li');
			var tagName = document.createElement('h3');
			let showTagUrl = url + '/' + source.id;

			tagName.innerHTML = source.name;
			tagName.addEventListener('click',function(){
				sessionStorage.setItem('showTagUrl',showTagUrl);
				location.href = 'showTag.html';
			});
			li.appendChild(tagName);
			document.getElementById('tagList').appendChild(li);
		}
		return function(o,url){
				var source = JSON.parse(o.responseText);
				var counts = source.length;
				for(let i = 0; i < counts; i++){
					addTagNode(source[i],url);
				}
			}
	})();
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
	var showTeam = (function(){
		function addTeamNode(source,url){
			var name = document.createElement('h3');
			name.innerHTML = source.name;	//团队名称
			var desc = document.createElement('div');
			var github = document.createElement('div');
			var img = document.createElement('img');
			var githubMore = document.createElement('a');
			var xdu = document.createElement('div');
			var xduMore = document.createElement('a');
			var website = document.createElement('div');
			var websiteMore = document.createElement('a');

			img.src = source.url;	//团队头像
			img.classList.add('img-circle');
			desc.innerHTML = source.desc;	//	团队简介

			xdu.innerHTML = "西电官网:&emsp;";
			xduMore.innerHTML = "http://www.xidian.edu.cn";
			xduMore.href = "http://www.xidian.edu.cn";
			xdu.appendChild(xduMore);
			xduMore.classList.add('info');

			website.innerHTML = "团队主页:&emsp;";
			websiteMore.classList.add('info');
			websiteMore.innerHTML = source.website;
			websiteMore.href = source.website;
			website.appendChild(websiteMore);

			github.innerHTML = "团队github地址:&emsp;";
			githubMore.innerHTML = source.github;
			githubMore.href = source.github;
			github.appendChild(githubMore);
			githubMore.classList.add('info');

			var team = document.getElementById('team');
			team.appendChild(img);
			team.appendChild(name);
			team.appendChild(desc);
			team.appendChild(website);
			team.appendChild(github);
			team.appendChild(xdu);
		}
		return function (o,url) {
			var source = JSON.parse(o.responseText);
			addTeamNode(source);
		}
	})();
	return {
		showArticle: showArticle,
		showAuthor: showAuthor,
		asyncRequest: asyncRequest,
		addArticle: addArticle,
		showAuthorMore: showAuthorMore,
		showTagArticles: showTagArticles,
		showTag: showTag,
		showTeam: showTeam
	};
})();
    //根据设备屏幕尺寸大小定制导航栏

window.onload = function () {
    if(document.body.clientWidth < 992){
        document.getElementById('minNav').style.display = 'block';
        document.getElementById('maxNav').style.display = 'none';
        document.getElementById('body').classList.remove('col-md-8');
        document.getElementById('body').classList.add('col-md-12');
    } else{
        document.getElementById('minNav').style.display = 'none';
        document.getElementById('maxNav').style.display = 'block';
        document.getElementById('body').classList.remove('col-md-12');
        document.getElementById('body').classList.add('col-md-8');

    }
}

window.onresize = function () {
    if(document.body.clientWidth < 992){
        document.getElementById('minNav').style.display = 'block';
        document.getElementById('maxNav').style.display = 'none';
        document.getElementById('body').classList.remove('col-md-8');
        document.getElementById('body').classList.add('col-md-12');
    } else{
        document.getElementById('minNav').style.display = 'none';
        document.getElementById('maxNav').style.display = 'block';
        document.getElementById('body').classList.remove('col-md-12');
        document.getElementById('body').classList.add('col-md-8');
    }
}