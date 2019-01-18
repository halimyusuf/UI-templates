const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config()

const pool = new Pool({
    connectionString : process.env.DB_URL
});

pool.on('connect', () => {
    console.log('connected to the db....');
});


// create User table
const createUsersTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        firstname text,
        lastname text,
        othernames text,
        email text UNIQUE NOT NULL,
        username text UNIQUE NOT NULL,
        phonenumber bigint,
        registered date,
        isadmin bool,
        password text
    )`;

    pool.query(queryText)
    .then((res) =>  {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
    
}

//create Incident table
const createIncidentTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS
    incidents(
        id SERIAL PRIMARY KEY,
        title text,
        story text,
        post_owner_id int,
        type text,
        latitude text,
        longitude text,
        created_on date,
        created_by text,
        images text,
        videos text,
        status text,
        FOREIGN KEY (post_owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;
    
    pool.query(queryText)
    .then((res) =>  {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
    
}


//inserting dummy user
const insertDummy = () => {
    const query = `INSERT INTO 
    users(firstname,lastname,othernames,email,password,username,phonenumber,registered,isadmin)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) 
    returning *`
    const values = ['halim','yusuf','olami','haleemyoosuph1@gmail.com','olami1','halimyusuf',0703550764,new Date,false]
    pool.query(query, values)
    .then(res => {
        console.log(res)
        pool.end();
    })
    .catch(error => {
        console.log(error);
        pool.end();
    });
}

// insert dummy data to incident
const insertIncident = () => {
    const query = `INSERT INTO
    incidents(title,story,type,longitude,latitude,created_by,images,videos,status)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    returning *`
    const values = ['This is a title','This is a story','Redflag','1.23','1.43','halim','images.jpg','videos.mp4','draft']
    pool.query(query,values)
    .then(res => {
        console.log(res)
        pool.end();
    })
    .catch(error => {
        console.log(error);
        pool.end();
    })
}



//drop User table
const dropUserTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    })
       
}

//drop Incident table
const dropIncidentTable = () => {
    const queryText = 'DROP TABLE IF EXISTS incidents';
    pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    })
      
}




const createAllTables = () => {
    createIncidentTable();
    createUsersTable();
  }

const dropAllTables = () => {
  dropUserTable();
  dropIncidentTable();
}

const insert = () => {
    insertDummy();
    insertIncident();
}

// const insertInc = () => {
//     insertIncident();
// }

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createUsersTable,
    createIncidentTable,
    dropUserTable,
    dropIncidentTable,
    createAllTables,
    dropAllTables,
    insertDummy,
    insert,
    insertIncident,
}



require('make-runnable');