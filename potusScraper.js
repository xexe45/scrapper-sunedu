const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.sunedu.gob.pe/lista-universidades/';
var fs = require('fs');

rp(url)
  .then(function(html){
    //success!
    var length = $('.column-2', html).length;
    var data = $('.column-2', html);
    
   const wikiUrls = [];
   for (let i = 0; i < length; i++) {
        var name = $('.column-2', html)[i].children[0]['data'];

        if( name != 'UNIVERSIDAD' ) {
                var data = {
                    name: name
                };
                wikiUrls.push(data);
            
        }
    }

    var jsonContent = JSON.stringify(wikiUrls);

    fs.writeFile("universidades.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
   //success!
   /*
   const wikiUrls = [];
   for (let i = 0; i < 159; i++) {
     wikiUrls.push($('.column-2', html)[i]);
   }
   console.log(wikiUrls);
   */
  })
  .catch(function(err){
    //handle error
  });
