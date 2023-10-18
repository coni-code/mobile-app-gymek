runbackend() {
    docker compose up --build -d
    symfony server:start -d
    cd ../
}

stopbackend() {
    docker compose down
    symfony server:stop
    cd ../
}

console() {
    php bin/console "$@"
}

dmysql() {
    docker exec -it gy_mysql mysql -u gy -pgy gy
}
