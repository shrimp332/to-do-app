FROM python:alpine3.24
WORKDIR /app
COPY requirements.txt .
COPY src/ ./
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8080
CMD ["waitress-serve", "main:app"]
