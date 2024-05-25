FROM tiangolo/uvicorn-gunicorn:python3.10-slim
WORKDIR /app
COPY ./requirements.txt /app
RUN pip install -r requirements.txt
COPY . /app
ARG PORT=8080
ENV PORT=8080
EXPOSE ${PORT}
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]