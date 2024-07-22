FROM manulera/shareyourcloningfrontend as frontend

FROM manulera/shareyourcloningbackend as backend
WORKDIR /home/backend
COPY --from=frontend /build ./frontend
COPY ./config.json ./frontend/config.json
ENV SERVE_FRONTEND=1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
