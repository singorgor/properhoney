@echo off
echo 启动适配恋人网站...
echo.

REM 检查 node_modules 是否存在
if not exist "node_modules" (
    echo 正在安装依赖包...
    npm install
    if errorlevel 1 (
        echo.
        echo 安装失败！请检查网络连接或手动运行: npm install
        pause
        exit /b 1
    )
)

echo.
echo 启动开发服务器...
echo 浏览器将自动打开 http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm start