print('Start #################################################################');
db = db.getSiblingDB('amplyst');

db.createUser ({
    user: 'dbuser',
    pwd: 'dbpassword',
    roles: [{ role: 'readWrite', db: 'amplyst'}]
});

db.createCollection('user_info');
db.createCollection('lists');