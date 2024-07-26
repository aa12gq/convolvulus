#!/bin/bash

# 退出脚本，如果任何命令返回非零退出状态
set -e

REMOTE_HOST=192.236.160.133
REMOTE_PATH=/home/pieve-ui/
LOCAL_BUILD_COMMAND="pnpm run build"
LOCAL_BUILD_PATH=dist
DEPLOY_SCRIPT=docker_deploy.sh

# 在本地执行 pnpm run build
echo "正在本地执行 ${LOCAL_BUILD_COMMAND}..."
${LOCAL_BUILD_COMMAND}
echo "构建完成。"

# 使用 rsync 同步 dist 目录到远程服务器
echo "正在同步 ${LOCAL_BUILD_PATH} 目录到远程服务器..."
rsync -rv ${LOCAL_BUILD_PATH} root@${REMOTE_HOST}:${REMOTE_PATH}
echo "同步完成。"

# 在服务器上执行docker_deploy.sh脚本
echo "正在服务器上执行${DEPLOY_SCRIPT}脚本……"
ssh root@${REMOTE_HOST} "cd ${REMOTE_PATH} && ./${DEPLOY_SCRIPT}"
echo "脚本执行完成。"