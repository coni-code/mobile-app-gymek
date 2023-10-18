run() {
#   run frontend
    cd frontend
    npm run android
    cd ../

#   run backend
    cd backend
    docker compose up --build -d
    symfony server:start -d
    cd ../
}

stop() {
#   stop frontend
    cd frontend
    npx stop
    cd ../

#   stop backend
    cd backend
    docker compose down
    symfony server:stop
    cd ../
}
