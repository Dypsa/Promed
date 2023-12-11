$(function() {
    var client = ZAFClient.init()
    client.invoke('resize', { width: '100%', height: '120px' })
    showStar();
    });

function showStart() {
    var source = $("#start-hdbs").html();
    var template = Handlebars.compile(source);
    var html = template();
    $("#app").html(html);
};
