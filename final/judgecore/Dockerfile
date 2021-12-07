FROM python:3.9

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# ENV LANGUAGE_QUEUE_NAME 'python-3.9'

COPY . .

CMD ["python", "main.py"]