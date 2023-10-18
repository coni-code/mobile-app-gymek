gotobackend() {
    cd backend
}

runbackend() {
    gotobackend
    docker compose up --build -d
    symfony server:start -d
}

stopbackend() {
    gotobackend
    docker compose down
    symfony server:stop
}

console() {
    php bin/console "$@"
}

dmysql() {
    docker exec -it gy_mysql mysql -u gy -pgy gy
}
