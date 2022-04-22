FROM mongo:4.2

COPY mongod.conf /etc/mongod.conf

COPY replica-init.js /docker-entrypoint-initdb.d/replica-init.js

CMD [ "--replSet", "rsg3" ]
