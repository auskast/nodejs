#!/bin/bash

PID_FILE='/tmp/server.pid'
LOG_FILE='/tmp/server.log'
SERVER_FILE='server.js'

function start_server {
    echo "Starting node server..."
    if [ -f $PID_FILE ]; then
        echo "Process already running!"
        exit
    fi
    node $SERVER_FILE > $LOG_FILE &
    echo $! > $PID_FILE
}

function stop_server {
    echo "Stopping node server..."
    if [ -f $PID_FILE ]; then
        pid=`cat $PID_FILE`
        kill $pid
        rm $PID_FILE
    else
        echo "Process not found!"
    fi
}

function restart_server {
    stop_server
    start_server
}

case $1 in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        restart_server
        ;;
    *)
        echo "Usage server [ start | stop | restart ]"
        ;;
esac
