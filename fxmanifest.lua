fx_version 'cerulean'

game 'gta5'

ui_page 'html/index.html'

server_scripts {  
	'@mysql-async/lib/MySQL.lua',
	'config.lua',
	'server/main.lua'
}


client_scripts {
	'config.lua',
	'client/main.lua'
}

files {
	'html/index.html',
	'html/css/style.css',
    'html/js/index.js',
    'html/img/bank_logo.png',
    'html/img/creditcard.jpeg'
} 