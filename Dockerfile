# A lighter version of Node
FROM mhart/alpine-node:14

# Set the working directory to /backend
WORKDIR /backend

#Copy the current directory contents into the container at /backend
COPY . /backend/

#install dependencies
RUN npm install

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app when the container launches
CMD ["node", "app.js"]
