set -e
echo "ROOT_PATH: ${ROOT_PATH}"
echo "BACKEND_URL: ${BACKEND_URL}"
cd frontend
# Create config.json with env vars
echo "Generating config.json"
envsubst < config.env.json > config.json
echo "------------------------------------"
cat config.json
echo ""
echo "------------------------------------"
cd ..

# Only add --root-path if ROOT_PATH is not empty, otherwise uvicorn will throw an error
uvicorn main:app --host 0.0.0.0 --port 8000 ${ROOT_PATH:+--root-path ${ROOT_PATH}}