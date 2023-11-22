runbackend() {
    docker compose up --build -d
    printf "Application is running on \e[4mhttp://127.0.0.1:80\e[0m\n"
}

stopbackend() {
    docker compose down
}

console() {
    php bin/console "$@"
}

dmysql() {
    docker exec -it gy_mysql mysql -u gy -pgy gy
}

dphp() {
    docker exec -it gy_php "$@"
}

dnginx() {
    docker exec -it gy_nginx "$@"
}
