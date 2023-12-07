@echo off
chcp 65001
"mongoimport.exe" --uri="mongodb://localhost:27017/tdd" --collection=users --drop --file=users.json --jsonArray
echo PLEASE KILL AND RESTART YOUR BACKEND SERVER DEV TASK IF RUNNING!