var soap = require('soap');
var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.render('index', {
        title: 'Select information',
        names: []
    });
})

app.set('view engine', 'ejs');

app.get('/operators', function(req ,res) {
    var url = "http://35.198.226.146:7789/?wsdl";
    var opertors ;
    soap.createClient(url, function(err, client) {
        client.get_opertors(function(err, result) {
            console.log(result.get_opertorsResult.stringArray);
            opertors = result.get_opertorsResult.stringArray;
            res.render('index', {
                title: 'Opertors List',
                names: opertors
            });
        });
    });
});

app.get('/routes', function(req ,res) {
    var url = "http://35.198.226.146:7789/?wsdl";
    var routes ;
    soap.createClient(url, function(err, client) {
        client.get_routes(function(err, result) {
            console.log(result);
            routes = result.get_routesResult.stringArray;
            res.render('index', {
                title: 'Routes List',
                names: routes                           
            });
        });
    }); 
});

app.get('/timetable', function(req ,res) {
    var url = "http://35.198.226.146:7789/?wsdl";
    var timetable;
    soap.createClient(url, function(err, client) {
        client.get_timetable(function(err, result) {
            console.log(result);
            timetable = result.get_timetableResult.stringArray;
            res.render('index', {
                title: 'timetable List',
                names: timetable                           
            });
        });
    });
});

var server = app.listen(3030,function(){
    var host = "35.198.226.146";
    var port = server.address().port;
    console.log("server running at http://%s:%s\n",host,port);
});