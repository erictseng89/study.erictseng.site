var firebase;

$( () => {
  let userName = $('#name'),
      message = $('#content'),
      btn = $('#btn'),
	  btn2 = $('#btn2'),
      show = $('#show'),
      ms = new Date().getTime();
	  
  var config = {
    //databaseURL: "https://test0504-e0273.firebaseio.com/" //你的資料庫名稱
	databaseURL: "https://maps-chatbox-default-rtdb.firebaseio.com/"
  };
  
  firebase.initializeApp(config);
  let database = firebase.database().ref();
  /*
.on()所佔用的記憶體會比.click還少
.on()為Namespaced Events，可以做到事件命名的管理。
  */
	btn2.on('click',remove);
  
  	btn.on('click',write);
  //設定在對話框按下 enter 的事件 ( enter 預設 keyCode 為 13 )
  	message.on('keydown', (e) => {
    if(e.keyCode == 13){
      write();
    }
  });
  
  function remove(){
  //firebase.database().ref('users/').remove();
  database.remove();
  window.location.reload();
  }
  
  function write(){
    let date = new Date();
	let
	h = date.getHours(),
	m = date.getMinutes(),
	s = date.getSeconds();
    /* var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds(); */
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
/* 	if(h<10){
      h = '0'+h;
    }
    if(m<10){
      m = '0' + m;
    }
    if(s<10){
      s = '0' + s;
    } */
	
	let timeNow = `${h}:${m}:${s}`;

	let postData = {
		name:userName.val(),
		content:message.val(),
		time:timeNow,
		id:'id'+ms
	};

    /* var now = h+':'+m+':'+s; *///獲取按下按鈕或 enter 的當下時間
	
	//記得一開始要先宣告 ms = new Date().getTime()
/*     var postData = {
      name:userName.val(),
      content:message.val(),
      time:now,
      id:'id'+ms
    }; */
	
    database.push(postData);
    message.val('');
  }
  
  //第一次載入資料庫時顯示所有內容
  database.once('value', (snapshot) => {
	show.html('');
	for (var i in snapshot.val()) {
		let c = snapshot.val()[i];
		show.prepend(`<div><div>${c.time}</div>${c.name} 說: ${c.content}</div>`)
	}
	/* snapshot.val().forEach( (a) => {
		show.prepend(`<div><div>${a.time}</div> ${a.name} 說: ${a.content}</div>`);
	}) */
    /* $show.html('');
    for(var i in snapshot.val()) {
       show.prepend('<div><div>'+snapshot.val()[i].time+'</div>'+snapshot.val()[i].name+' 說：'+snapshot.val()[i].content+'</div>');
    } */
  });
  
  //每一次資料庫有變動時，獲取最新一筆內容呈現
  database.limitToLast(1).on('value', (snapshot) => {
    for(var i in snapshot.val()){
		let c = snapshot.val()[i];
		show.prepend(`<div class="${c.id}"><div>${c.time}</div>${c.name} 說: ${c.content}</div>`);
		/* show.prepend(`<div class="${snapshot.val()[i].id}"><div>${snasphot.val()[i].time}</div>${snapshot.val()[i].name} 說: ${snapshot.val()[i].content}</div>`); */
       /* show.prepend('<div class="'+c.id+'"><div>'+c.time+'</div>'+c.name+' 說：'+c.content+'</div>'); */
    }
	
	//如果是自己發出去的文字，就改變顏色
    show.find('.id'+ms).css({
      color:'#f00'
    });
	
    show.find('.id'+ms+' div').css({
      color:'#f00'
    });
  });  
});