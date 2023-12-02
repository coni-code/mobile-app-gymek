run() {
#   run backend
    cd backend
    symfony server:start -d
    cd ../

#   run frontend
    cd frontend
    npm run android
    cd ../
}

stop() {
#   stop backend
    cd backend
    symfony server:stop
    cd ../

#   stop frontend
    cd frontend
    npx stop
    cd ../
}
