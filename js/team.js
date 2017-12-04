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