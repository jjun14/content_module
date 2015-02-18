module.exports = function(request, response){
  var fs = require('fs');
  var url_type = request.url.split('.')[1];
  var url_path = request.url.split('/')[1];
  console.log(url_type);
  console.log(url_path);

  if(request.url === '/'){
    fs.readFile('./views/index.html', 'utf8', function (errors, contents){
      response.write(contents); 
      response.end();
    });
  }
  else if(url_type)
  {
    if(url_type === 'css')
    {
      fs.readFile("./stylesheets/"+url_path, 'utf8', function (errors, contents){
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(contents);
        response.end();
      });
    }
    else if(url_type === 'png' || url_type === 'img' || url_type === 'jpg' || url_type === 'jpeg')
    {
      fs.readFile("./images/"+url_path, function (errors, contents){
        // response.writeHead(200, {'Content-Type': 'image/'+url_type});
        response.write(contents);
        response.end();
      });
    }
  }
  else if(url_path){
    fs.readFile("views/"+ url_path + '.html', 'utf8', function (errors, contents){
      response.write(contents);
      response.end();
    });
  } 
  else 
  {
    response.end('File not found!!!');
  }
}