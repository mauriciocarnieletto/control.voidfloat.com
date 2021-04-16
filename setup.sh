VOID_SERVER_DATABASE_FILE="resources/database/voidserver.db"

echo "Updating system packages"
apt update
apt full-upgrade

echo "Installing redis"
apt install redis-server
redis-cli ping
redis-cli config set notify-keyspace-events KEA


echo "Starting server setup"


if [[ ! -e $VOID_SERVER_DATABASE_FILE ]]; then
  echo "Creating voidserver db file"
  mkdir -p ./resources/database
  touch $VOID_SERVER_DATABASE_FILE
fi
