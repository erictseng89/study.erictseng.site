var CHANNEL_ACCESS_TOKEN = '16t7EWDB/IbENR4U8Qlnl4vOFG1IWSU6cIHFqD+qr8fujw+yUdvY9wZeaYlJ4gdkmi0LP/VlkX30yg3Px2cJlfrLzBespdJyj/+I8TMmk/Eo6R7kwP6c6jolHptJz/3qo0aTB3nBS3kfKUfaJvxJPAdB04t89/1O/w1cDnyilFU=';
var username;

//抓取IP位置
function doGet(e) {
    return ContentService.createTextOutput(UrlFetchApp.fetch("http://ip-api.com/json"));
}

//抓用戶名
function getUsername(userId) {
    var url = 'https://api.line.me/v2/bot/profile/' + userId;
    var response = UrlFetchApp.fetch(url, {
        'headers': {
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
    });
  return JSON.parse(response.getContentText()).displayName;
}

//處理Line server傳進來訊息，再送出訊息到用戶端

function doPost(e) {
    var events = JSON.parse(e.postData.contents).events[0];
    var reply_token = events.replyToken;
    
    //取得用戶名
    var userId = JSON.parse(e.postData.contents).events[0].source.userId;
    username = getUsername(userId);
    //
    
    if (typeof reply_token === 'undefined') {
      return;
    }
      
    
    var url = 'https://api.line.me/v2/bot/message/reply';
    
    var header = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    }

    var payload = {
      'replyToken': reply_token,
      'messages' : ProcMsg(events.message)
    }
    
    var options = {
      'headers': header,
      'method': 'post',
      'payload': JSON.stringify(payload)
    }
    
    UrlFetchApp.fetch(url, options);

    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

//------------
//下列為自訂範圍值的亂數函式(最小值,最大值)
function usefloor(min,max) {
return Math.floor(Math.random()*(max-min+1)+min);
}
//================
function ProcMsg(message)
{
  var type = message.type;
  var retMsg;
  var textx=message.text

  switch(type)
  {
    case 'text':
     
//=========
//***************為了更新excel
//將Sheet指定為"資料庫"試算表     SpreadSheet = 試算表
  var SpreadSheet = SpreadsheetApp.openById("1EgWUSPe2ReygqhCC9gd6OG89wBIL9WcnQ-liGPk75dM");
  //取得頁籤:"工作表3"              Sheet = 頁籤
  var Sheet = SpreadSheet.getSheetByName("x1");
  //取得有資料的最後一行的"行數"(目的要在最後一行插入新資料)
  var LastRow = Sheet.getLastRow();
  //--開始寫入資料--
  Sheet.getRange(1, 1).setValue("ok"); //意即最後一行的加一行處，左邊數來第一格，寫入數值為number
//***************
  //將Sheet指定為"資料庫"試算表     SpreadSheet = 試算表
  var SpreadSheet = SpreadsheetApp.openById("1EgWUSPe2ReygqhCC9gd6OG89wBIL9WcnQ-liGPk75dM");
  //取得頁籤:"工作表1"              Sheet = 頁籤
  var Sheet = SpreadSheet.getSheetByName("w1");
  //取得有資料的最後一行的"行數"(目的要在最後一行插入新資料)
  var LastRow = Sheet.getLastRow();
  
  //--開始寫入資料--
  
  //在最後一行的下一行寫入資料
  //首先寫入number
  Sheet.getRange(LastRow+1, 1).setValue(message.id); //意即最後一行的加一行處，左邊數來第一格，寫入數值為number
  //寫入name
  Sheet.getRange(LastRow+1, 2).setValue(message.text); //意即最後一行的加一行處，左邊數來第二格，寫入數值為name
  //寫入score
  Sheet.getRange(LastRow+1, 3).setValue(username); //意即最後一行的加一行處，左邊數來第三格，寫入數值為score
  //寫入score
var today=new Date();
var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+')';
　 Sheet.getRange(LastRow+1, 4).setValue(currentDateTime); //意即最後一行的加一行處，左邊數來第三格，寫入數值為score

//=========增加keyword      
var arr=message.text.split(";");
if(arr[0]=="jr")
{
  //將Sheet指定為"資料庫"試算表     SpreadSheet = 試算表
  var SpreadSheet = SpreadsheetApp.openById("1EgWUSPe2ReygqhCC9gd6OG89wBIL9WcnQ-liGPk75dM");
  //取得頁籤:"工作表1"              Sheet = 頁籤
  var Sheet = SpreadSheet.getSheetByName("x1");
  //取得有資料的最後一行的"行數"(目的要在最後一行插入新資料)
  var LastRow = Sheet.getLastRow();
  
  //--開始寫入資料--
  
  //在最後一行的下一行寫入資料
  //首先寫入number
  Sheet.getRange(LastRow+1, 1).setValue(arr[1]); //意即最後一行的加一行處，左邊數來第一格，寫入數值為number
  //寫入name
  Sheet.getRange(LastRow+1, 2).setValue(arr[2]); //意即最後一行的加一行處，左邊數來第二格，寫入數值為name
  //寫入score
  //Sheet.getRange(LastRow+1, 3).setValue(username); //意即最後一行的加一行處，左邊數來第三格，寫入數值為score
  //寫入score
   var today=new Date();
   var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+')';
　 Sheet.getRange(LastRow+1, 4).setValue(currentDateTime); //意即最後一行的加一行處，左邊數來第三格，寫入數值為score
}
//=========      
if(arr[0]=="img") {
  var SpreadSheet = SpreadsheetApp.openById("1EgWUSPe2ReygqhCC9gd6OG89wBIL9WcnQ-liGPk75dM");
  var Sheet = SpreadSheet.getSheetByName("images");
  var LastRow = Sheet.getLastRow(); 

  var data = []
  for (i=0; i<LastRow; i++) {
      data[i]=[];
  }
  data = Sheet.getRange(1,1,LastRow,3).getValues();

  var keyword = arr[1];

  for(i=0; i<LastRow; i++) {
    var re = data[i][0];
    var ori = "";
    var pre = "";
    if (src.match(re)!=null) {
      result = src.match(re);
      keyword=result;
      ori = data[i][1];
      pre = data[i][2];    
    }

    retMsg = {
      "type": "image",
      "originalContentUrl": ori,
      "previewImageUrl": pre
    };
    break;
  }
  return [retMsg];
}


//進excel找資料
  var keyword = message.text;
  
  //將Sheet指定為"資料庫"試算表     SpreadSheet = 試算表
  var SpreadSheet = SpreadsheetApp.openById("1EgWUSPe2ReygqhCC9gd6OG89wBIL9WcnQ-liGPk75dM");
  //取得頁籤:"工作表1"              Sheet = 頁籤
  var Sheet = SpreadSheet.getSheetByName("x1");
  //取得有資料的最後一行的"行數"(目的要在最後一行插入新資料)
  var LastRow = Sheet.getLastRow(); 
      
  //取得整個資料
  var data =[];
  for (i=0;i<LastRow;i++){
    data[i]=[];
  }
  data = Sheet.getRange(1,1,LastRow,3).getValues();
  
  //宣告回傳直
  var name,retext,xo
  xo=0;
  var datax =[];//放重複關鍵字資料

//比對
var src = keyword;

  //逐筆找資料 比對關鍵字
for(i=0;i<LastRow;i++){
    var re = data[i][0];
    if(src.match(re)!=null)
    {
    result = src.match(re);
    keyword=result;
    break;
    }
  }

//逐筆找資料 比對關鍵字
  for(i=0;i<LastRow;i++){
  //
    if(data[i][0]==keyword){
      datax[xo]=[];
      datax[xo][1]=data[i][1];
      datax[xo][2]=data[i][2];
      xo=xo+1;
    }
  }
      
  //逐筆找資料 傳訊
      //j=0;
      j=usefloor(0, xo-1);
      name=datax[j][1];
      retext=datax[j][2];
      
    if(arr[0]=="jr")
     {
      retMsg = {
            'type': type,
            'text':"我記住了!!!" 
         };   
     }
     
     if(arr[0]!="jr")
     {
         retMsg = {
           'type': type,
           'text': name+retext
         }; 
      }
      
  if(i==LastRow-1){
    //沒找到
     retMsg = {
           'type': type,
           'text': message.text
         };
  }
    break;
      
    case 'image':
         retMsg = {
           "type": "image",
           "originalContentUrl": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0783062d0d860b8ae7d8e859241a700359c4d981.png",
           "previewImageUrl": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0783062d0d860b8ae7d8e859241a700359c4d981.png"
         };
    break;
      
    case 'sticker':
         retMsg = {
           'type': type,
           'packageId': message.packageId,
           'stickerId': message.stickerId            
         };
    break;      
  }

  return [retMsg];
}