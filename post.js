var db = require('./db');

var fnPublish = function(data, callback){
	var link = data.url || '/'+ Math.round(Math.random() * 1000000)
		
		,	newPost = new db.Post({
				title: data.title || '',
				url: link.toString(),
				body: data.body || '',
				tags: data.tags || [],
				date: new Date().getTime(),
				author: data.author || {},
				status: data.status || '',
				stats: {}
			});
		
		newPost.save(function(err, post){
			if(err) throw err;
			if(callback && typeof(callback) === 'function'){
				callback(link)
			}
		});
}

exports.fnPublish = fnPublish;

exports.publish = function(req, res){
	var data = req.body;
	if(data){
		fnPublish(data, function(link){
			res.redirect(link);
		})
	} else {
		
	}
};

exports.latest = function(req, res){
	var l = req.params.l || 10
		,	s = req.params.s || 0;
		
	db.Post.find().skip(s).limit(l).sort({ 'date' : -1}).exec(function(err, posts){
		if(err) throw err;
		var list = '';
		
		for(var i=0; i< posts.length; i++){
			list += '<h2><a href="'+posts[i].url+'">'+posts[i].title+'</a></h2><p>' + posts[i].body + '</p>';
		}
		
		res.render('../pages/index.jade', {list: list});
		
	});
}