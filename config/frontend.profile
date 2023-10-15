gotofrontend() {
    cd frontend
}

runfrontend() {
    gotofrontend
    npx run android
    cd ../
}

stopfrontend() {
    gotofrontend
    npx stop
    cd ../
}
