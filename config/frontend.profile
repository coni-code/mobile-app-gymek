gotofrontend() {
    cd frontend
}

runfrontend() {
    gotofrontend
    npm run android
    cd ../
}

stopfrontend() {
    gotofrontend
    npx stop
    cd ../
}
