ARG FRONTEND_TAG="latest"

FROM manulera/shareyourcloningfrontend:${FRONTEND_TAG} AS frontend

FROM manulera/shareyourcloningbackend AS backend
WORKDIR /home/backend
COPY --from=frontend /build ./frontend
COPY ./config.json ./frontend/config.json
ENV SERVE_FRONTEND=1

ENV ROOT_PATH=""
# Only add --root-path if ROOT_PATH is not empty, otherwise uvicorn will throw an error
CMD uvicorn main:app --host 0.0.0.0 --port 8000 ${ROOT_PATH:+--root-path ${ROOT_PATH}}
