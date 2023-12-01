run() {
#   run backend
    cd backend
    docker compose up --build -d
    cd ../

#   run frontend
    cd frontend
    npm run android
    cd ../
}

stop() {
#   stop backend
    cd backend
    docker compose down
    symfony server:stop
    cd ../

#   stop frontend
    cd frontend
    npx stop
    cd ../
}
