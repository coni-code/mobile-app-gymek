source config/backend.profile
source config/frontend.profile

run() {
    runfrontend
    runbackend
}

stop() {
    stopfrontend
    stopbackend
}
