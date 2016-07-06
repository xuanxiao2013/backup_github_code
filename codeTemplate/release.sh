#发布脚本
rm -rf ./release
echo '静态文件开始编译...'

fis release -m  -o -p -d ./release --domains -f ./config.js
#fis release -m -o -p -d ./release --domains -f ./config.js --verbose
rm -rf ./release/pages
rm -rf ./release/csssprites-map.json
echo '静态文件编译完成'
echo '发布完成'
