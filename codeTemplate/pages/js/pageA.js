$(function(){	
	var html = ns.util.template($('#PageAtpl').html(), {});
	$('#tplContent').empty().append(html);
	log('ok')
});