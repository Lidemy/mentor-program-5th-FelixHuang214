#!/bin/bash

if [ $1 -gt 0 ]; then
	for ((i=1;i<=$1;i++)); do
		touch "$i.js"
	done
echo "檔案建立完成"	
else
	echo "錯誤，請輸入大於 0 的數字"
fi
