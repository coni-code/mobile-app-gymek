source backend/backend.profile
source frontend/frontend.profile

run() {
    runfrontend
    runbackend
}

stop() {
    stopfrontend
    stopbackend
}
