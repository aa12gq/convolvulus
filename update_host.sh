#!/bin/bash

# 检查是否提供了主机参数
if [ "$#" -ne 1 ]; then
    echo "用法: $0 <host>"
    exit 1
fi

HOST=$1

# 获取当前目录
CURRENT_DIR=$(pwd)

# 更新 deploy.sh 文件中的 REMOTE_HOST
DEPLOY_FILE="$CURRENT_DIR/deploy.sh"
if [ -f "$DEPLOY_FILE" ]; then
    echo "正在将 $DEPLOY_FILE 中的 REMOTE_HOST 更新为 $HOST..."
    sed -i "" "s/REMOTE_HOST=.*/REMOTE_HOST=$HOST/" "$DEPLOY_FILE"
    echo "已更新 $DEPLOY_FILE 中的 REMOTE_HOST。"
else
    echo "$DEPLOY_FILE 不存在"
    exit 1
fi

# 更新 .env.development 文件中的 VITE_BASE_PATH
ENV_FILE="$CURRENT_DIR/.env.development"
if [ -f "$ENV_FILE" ]; then
    echo "正在将 $ENV_FILE 中的 VITE_BASE_PATH 更新为 http://$HOST..."

    # 删除未注释的 VITE_BASE_PATH 行
    sed -i "" "/^VITE_BASE_PATH=http/d" "$ENV_FILE"

    # 查找最后一个注释的 VITE_BASE_PATH 行，并在其后添加新的 VITE_BASE_PATH 行
    awk '
    {
        print
        if (/^# VITE_BASE_PATH =/) last_comment_line=NR
    }
    NR == last_comment_line {
        print "VITE_BASE_PATH=http://'$HOST'"
        next
    }' "$ENV_FILE" > tmp && mv tmp "$ENV_FILE"

    echo "已更新 $ENV_FILE 中的 VITE_BASE_PATH。"
    
    # 输出文件内容以检查修改
    echo "文件内容检查："
    cat "$ENV_FILE"
else
    echo "$ENV_FILE 不存在"
    exit 1
fi

echo "所有更新已完成。"