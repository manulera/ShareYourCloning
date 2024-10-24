ARG FRONTEND_TAG="latest"

FROM manulera/shareyourcloningfrontend:${FRONTEND_TAG} AS frontend

FROM manulera/shareyourcloningbackend AS backend
WORKDIR /home/backend
COPY --from=frontend /build ./frontend
COPY ./docker_entrypoint.sh ./

# To have access to envsubst
USER root
RUN apt-get update && apt-get install -y gettext-base
# Allow user backend to overwrite frontend/config.json
RUN chown backend:backend ./frontend/config.json

USER backend

ENV SERVE_FRONTEND=1
ENV ROOT_PATH=""
ENV BACKEND_URL="/"

CMD sh docker_entrypoint.sh
