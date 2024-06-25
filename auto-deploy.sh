#!/bin/bash

# 第一步：通过sh文件指定的host，然后运行ssh命令链接到该host的服务器
echo "正在连接到服务器 $HOST..."
HOST=$1
DOMAIN=$2
SSH_USER="root" # 替换为实际的SSH用户名
REMOTE_HOME="/home/$SSH_USER"

# 连接到服务器并执行后续操作
ssh $SSH_USER@$HOST << 'EOF'
echo "连接成功，开始部署应用..."

# 第二步：通过docker部署redis设置容器名字为redis，redis密码设置成myy515156
echo "正在部署 Redis..."
docker pull redis
docker run -d --name redis -p 6379:6379 -e REDIS_PASSWORD=myy515156 redis
echo "Redis 部署流程完成。"

# 第三步：通过docker部署mysql设置容器名字为mysql，mysql密码设置成myy515156
echo "正在部署 MySQL..."
docker pull mysql
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=myy515156 --name mysql mysql
echo "MySQL 部署流程完成。"

# 第四步：退出服务器回到命令行
echo "操作完成，退出服务器。"
EOF

# 回到命令行，进入到/Users/aa12/piece-server-two目录，运行update_host.sh文件
echo "回到本地命令行，进入 /Users/aa12/piece-server-two 目录，运行 update_host.sh..."
cd /Users/aa12/piece-server-two
./update_host.sh $HOST
echo "update_host.sh 执行完成。"

# 第五步：将update_host.sh文件生成的config.yaml.bak文件推送到指定host的home目录，并重命名为config.yaml
echo "推送 config.yaml.bak 到 $HOST 服务器并重命名为 config.yaml..."
scp config.yaml.bak $SSH_USER@$HOST:$REMOTE_HOME/config.yaml
echo "文件推送完成。"

# 第六步：在服务器home目录下创建restart.sh脚本并填写内容
echo "创建 restart.sh 脚本..."
ssh $SSH_USER@$HOST << 'EOF'
cat > $REMOTE_HOME/restart.sh << 'SCRIPT'
#!/bin/bash
ps ax | grep "gva" | grep -v grep | awk '{print $1}' | xargs -n 1 kill; sleep 2
nohup ./gva > app.log 2>&1 &
SCRIPT
chmod +x $REMOTE_HOME/restart.sh
echo "restart.sh 创建完成。"

# 第七步：退出服务器回到命令行，在/Users/aa12/piece-server-two目录下运行make build-push命令
EOF

echo "回到本地命令行，进入 /Users/aa12/piece-server-two 目录，运行 make build-push..."
cd /Users/aa12/piece-server-two
make build-push
echo "make build-push 执行完成。"

# 第八步：等待完成后回到命令行，进入/Users/aa12/piece-ui-two目录，执行update_host.sh脚本
echo "进入 /Users/aa12/piece-ui-two 目录，运行 update_host.sh..."
cd /Users/aa12/piece-ui-two
./update_host.sh $HOST
echo "update_host.sh 执行完成。"

# 第九步：链接服务器，在/home目录下创建pieve-ui文件夹，填充相应文件
echo "连接到服务器，在 /home 目录下创建 pieve-ui 文件夹并填充文件..."
ssh $SSH_USER@$HOST << 'EOF'
mkdir -p $REMOTE_HOME/pieve-ui/cert
echo "创建 pieve-ui 目录及证书目录完成。"

cat > $REMOTE_HOME/pieve-ui/default.conf << 'SCRIPT'
server {
    listen       8080;
    listen 443 ssl;
    client_max_body_size    50M;
    server_name  $DOMAIN;
    ssl_certificate  /usr/share/nginx/cert/fullchain.pem;
    ssl_certificate_key /usr/share/nginx/cert/key.pem;
    ssl_session_timeout 5m;
    ssl_ciphers HIGH+kEECDH+AESGCM:HIGH+kEECDH:HIGH+kEDH:HIGH:!aNULL;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files \$uri \$uri/ /index.html =404;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    location /api/ {
      proxy_pass http://$HOST:8888/;
    }
}
SCRIPT
echo "default.conf 文件创建完成。"

cat > $REMOTE_HOME/pieve-ui/Dockerfile << 'SCRIPT'
FROM nginx

MAINTAINER aa12

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/
COPY /cert/ /usr/share/nginx/cert/
SCRIPT
echo "Dockerfile 文件创建完成。"

cat > $REMOTE_HOME/pieve-ui/docker_deploy.sh << 'SCRIPT'
#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

retry_times=3

for ((i=1; i<=retry_times; i++))
do
    echo -e "${YELLOW}开始构建 Docker 镜像... 尝试次数：$i${NC}"
    docker build . -t pieve-ui
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Docker 镜像构建成功！${NC}"
        break
    else
        echo -e "${RED}Docker 镜像构建失败，准备重试...${NC}"
        continue
    fi
done

for ((i=1; i<=retry_times; i++))
do
    echo -e "${YELLOW}尝试停止正在运行的 pieve-ui 容器... 尝试次数：$i${NC}"
    docker stop pieve-ui
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}成功停止 pieve-ui 容器！${NC}"
        break
    else
        echo -e "${RED}没有正在运行的 pieve-ui 容器，准备重试...${NC}"
        continue
    fi
done

for ((i=1; i<=retry_times; i++))
do
    echo -e "${YELLOW}启动新的 pieve-ui 容器... 尝试次数：$i${NC}"
    docker run -d -p 80:8080 --rm --name pieve-ui pieve-ui
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}成功启动 pieve-ui 容器！${NC}"
        break
    else
        echo -e "${RED}启动 pieve-ui 容器失败，准备重试...${NC}"
        continue
    fi
done
SCRIPT
chmod +x $REMOTE_HOME/pieve-ui/docker_deploy.sh
echo "docker_deploy.sh 文件创建并赋予执行权限完成。"

cat > $REMOTE_HOME/pieve-ui/cert/fullchain.pem << 'SCRIPT'
-----BEGIN CERTIFICATE-----
MIIEATCCA4agAwIBAgIRAOUV/KeJAIaUL0ILBks/3oswCgYIKoZIzj0EAwMwSzEL
MAkGA1UEBhMCQVQxEDAOBgNVBAoTB1plcm9TU0wxKjAoBgNVBAMTIVplcm9TU0wg
RUNDIERvbWFpbiBTZWN1cmUgU2l0ZSBDQTAeFw0yNDAxMTYwMDAwMDBaFw0yNDA0
MTUyMzU5NTlaMBkxFzAVBgNVBAMMDiouaGFveGlhbndzLmNuMFkwEwYHKoZIzj0C
AQYIKoZIzj0DAQcDQgAEC6dA3eoqEnapGZu9Luyc6wNS9LR3za+b3RZtVbUvQiN7
C44KaEBDLknBkQIbwVuK6wZq0hlhQ0kUDk+46CTMoKOCAnswggJ3MB8GA1UdIwQY
MBaAFA9r5kvOOUeu9n6QHnnwMJGSyF+jMB0GA1UdDgQWBBSh/aAUHd6YKJX28fv6
Pk4c5I8t+DAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0TAQH/BAIwADAdBgNVHSUEFjAU
BggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEEAbIxAQICTjAl
MCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29tL0NQUzAIBgZngQwBAgEw
gYgGCCsGAQUFBwEBBHwwejBLBggrBgEFBQcwAoY/aHR0cDovL3plcm9zc2wuY3J0
LnNlY3RpZ28uY29tL1plcm9TU0xFQ0NEb21haW5TZWN1cmVTaXRlQ0EuY3J0MCsG
CCsGAQUFBzABhh9odHRwOi8vemVyb3NzbC5vY3NwLnNlY3RpZ28uY29tMIIBBQYK
KwYBBAHWeQIEAgSB9gSB8wDxAHcAdv+IPwq2+5VRwmHM9Ye6NLSkzbsp3GhCCp/m
Z0xaOnQAAAGNEpzacAAABAMASDBGAiEA5eQCMgk3aPAtJjSzeLknYxtZ9bbfEbt5
EJXlU3Eoq0UCIQDK4irUiTxrK5jnC/gjAN+OLhe8ywEilYnazscJQzI3ZAB2ADtT
d3U+LbmAToswWwb+QDtn2E/D9Me9AA0tcm/h+tQXAAABjRKc2ywAAAQDAEcwRQIh
AMo9uIq35cmV/e+a8psuiEgWsuG4c6vwuR05j2iv9owMAiAw6+ZSqAWF+2ZStQGh
X6oV1grmf+8T94CDofN2w1rC0DAZBgNVHREEEjAQgg4qLmhhb3hpYW53cy5jbjAK
BggqhkjOPQQDAwNpADBmAjEA9Z6wnxNgJrnF3/sh6YkKKtnUPMD+iCNJY1dPLeMJ
IuqZYNvec58gXPPbjmNLCJ14AjEAy071sYpezR3ecLYqjP1I91ufnIBwOasOy2nt
02RF5dBLDGyi8tmi2hKF+kHpWON7
-----END CERTIFICATE-----
cat > $REMOTE_HOME/pieve-ui/cert/key.pem << 'SCRIPT'
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIMcI6KLL0gQrxbRCJWlY1GWVgmtnoZh3dKpep0CxkjnVoAoGCCqGSM49
AwEHoUQDQgAEC6dA3eoqEnapGZu9Luyc6wNS9LR3za+b3RZtVbUvQiN7C44KaEBD
LknBkQIbwVuK6wZq0hlhQ0kUDk+46CTMoA==
-----END EC PRIVATE KEY-----
SCRIPT

EOF

# 第十步：回到命令行，在/Users/aa12/piece-ui-two目录下执行deploy.sh脚本
cd /Users/aa12/piece-ui-two
echo "开始部署前端"
./deploy.sh

echo "自动部署完成！"