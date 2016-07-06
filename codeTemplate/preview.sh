#预览脚本

echo '项目实时预览开始..., 访问127.0.0.1:10000查看'

rm -rf ~/.fis-tmp/www/*

fis server stop
fis server start  -p 10000
fis release -wL -d ~/.fis-tmp/www/ -f ./config.js
echo '实时预览结束'
