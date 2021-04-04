echo "Starting server setup"

VOID_SERVER_DATABASE_FILE="resources/database/voidserver.db"

if [[ ! -e $VOID_SERVER_DATABASE_FILE ]]; then
  echo "Creating voidserver db file"
  mkdir -p ./resources/database
  touch $VOID_SERVER_DATABASE_FILE
fi
