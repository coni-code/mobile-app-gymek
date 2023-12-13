run() {
#   run backend
    cd backend
    symfony server:start -d
    docker compose up -d
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
    docker compose down
    cd ../

#   stop frontend
    cd frontend
    npx stop
    cd ../
}
