fis.config.set('project.charset', 'utf-8');
fis.config.set('project.md5Length', 8);
fis.config.set('project.md5Connector ', '.');
fis.config.set('project.include', 'pages/**');

fis.config.merge({
    namespace: 'csssprites',
    modules: {
        spriter: [require('/usr/local/lib/node_modules/fis-spriter-csssprites')]
    },
    roadmap: {
        path: [ 
            {
                reg :  /pages\/scss\/css\/*(.*\.(?:png|gif|jpg))/i,
                //访问图片的url
                url : '/img/$1',
	            //发布目录
	            release : '/img/$1'
            },
            {
                reg: /pages\/scss\/css\/(.*\.css)/i,
                useSprite: true,
                url : '/css/$1',
	            release : '/css/$1'
            },
            {
            	reg: /pages\/js\/(.*\.js)/i,
        		url : '/js/$1',
	            release : '/js/$1'
            },
            {
            	reg: /pages\/html\/(.*\.html)/i,
        		url : '/html/$1',
	            release : '/html/$1'
            },
            {
            	reg: /pages\/(.*\.html)/i,
        		url : '/release/$1',
	            release : '/$1'
            }
        ]
    },
    settings: {
        spriter:  [{
                margin: 4,
                layout: 'matrix'
        }],

        optimizer: {
            "png-compressor": {
                type: 'pngquant'
            }
        }
    }
});