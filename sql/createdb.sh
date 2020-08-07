#!/bin/bash
mysql -uroot -p -e "CREATE DATABASE $1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"