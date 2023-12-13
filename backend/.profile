runbackend() {
    symfony server:start -d
    docker compose up -d
    printf "Application is running"
}

stopbackend() {
    symfony server:stop
    docker compose down
    printf "Application was stopped"
}

console() {
    php bin/console "$@"
}
