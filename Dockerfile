FROM python:3-alpine3.15

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 5000 available
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "run.py"]