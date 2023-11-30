runbackend() {
    symfony server:start -d
    printf "Application is running"
}

stopbackend() {
    symfony server:stop
    printf "Application was stopped"
}

console() {
    php bin/console "$@"
}
