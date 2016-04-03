var feed = document.getElementById('feed');

document.getElementById('get_feed').addEventListener('click',function(){
  var phrase = document.getElementById('keyword').value;
  document.getElementById('keyword').value = "";
  feed.innerHTML = "";

  var requestMain = new XMLHttpRequest();
  requestMain.addEventListener('load', showFeed);
  requestMain.open('GET', "https://www.reddit.com/r/" + phrase + ".json");
  requestMain.send();
});

function showFeed(){
  var data = JSON.parse(this.responseText).data.children;

  for(var i = 0; i < data.length; i++){
    var title = data[i].data.title;
    var thumbnail = data[i].data.thumbnail;
    var postURL = data[i].data.url;

    if (thumbnail === "nsfw") {
      thumbnail = "http://i.imgur.com/UHzw6.png";
    }

    if (thumbnail === "self") {
      thumbnail = "http://www.cell.com/pb-assets/journals/society/ajhg/AMA%20event%20page/reddit-image.jpg";
    }

    if (thumbnail === "default") {
      thumbnail = "http://previews.123rf.com/images/dmytro121287/dmytro1212871501/dmytro121287150100007/35326421-Flat-newspaper-icon-Vector-illustration-Stock-Vector.jpg";
    }

    if (thumbnail === "") {
      thumbnail = "http://www.relix.com/images/uploads/about/VGv0AGio.png";
    }

    if(postURL.indexOf(".gif") !== -1 && postURL.indexOf("gifv") === -1 ){
      thumbnail = postURL;
    }

    var article = document.createElement('article');

    var img = document.createElement('img');
    img.src = thumbnail;

    var a = document.createElement('a');
    a.href = postURL;
    var p = document.createElement('p');
    p.innerHTML = title;
    a.appendChild(p);

    feed.appendChild(article);
    article.appendChild(img);
    article.appendChild(a);

  }

}