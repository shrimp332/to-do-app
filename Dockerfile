FROM python:alpine3.24
WORKDIR /app
COPY requirements.txt .
COPY src/ ./
RUN pip install --no-cache-dir -r requirements.txt
ENV PORT=8080
EXPOSE ${PORT}
CMD exec waitress-serve --port="${PORT}" main:app
