CREATE DATABASE pb_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100)
        UNIQUE
        NOT NULL,

    email VARCHAR(225)
        UNIQUE,
    
    password_hash TEXT
        NOT NULL,

    role VARCHAR(30),
        DEFAULT '',
    
    region VARCHAR(100)
        DEFAULT '',

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE schools (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255)
        UNIQUE 
        NOT NULL,

    city VARCHAR(100)
        DEFAULT '',

    region VARCHAR(100)
        DEFAULT '',

    address TEXT
        DEFAULT '',
    
    email VARCHAR(255)
        DEFAULT '',

    phone VARCHAR(30)
        DEFAULT '',

    relationship_status VARCHAR(30)
        DEFAULT '',

    owner_id INTEGER
        NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE
)

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,

    school_id BIGINT  
        NOT NULL
        REFERENCES schools(id)
        ON DELETE CASCADE,

    first_name VARCHAR(100)
        NOT NULL,
    
    last_name VARCHAR(100)
        NOT NULL,
    
    email VARCHAR(255)
        DEFAULT '',

    phone VARCHAR(30)
        DEFAULT '',

    position VARCHAR(100)
        DEFAULT '',

    interests TEXT
        DEFAULT '',

    email_allowed BOOLEAN 
        DEFAULT FALSE,
    
    created_at TIMESTAMP 
        DEFAULT CURRENT_TIMESTAMP,       
    
    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE programs (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255)
        UNIQUE
        NOT NULL,

    description TEXT 
        DEFAULT '',
    
    start_date DATE
        NOT NULL,
    
    end_date DATE
        NOT NULL, 

    created_at TIMESTAMP    
        DEFAULT CURRENT_TIMESTAMP

)

-- basically teacher participations, not post bellum employee participations
CREATE TABLE participations (
    id SERIAL PRIMARY KEY,

    school_id BIGINT 
        NOT NULL
        REFERENCES schools(id)
        ON DELETE CASCADE
    
    teacher_id BIGINT 
        NOT NULL 
        REFERENCES teachers(id)
        ON DELETE CASCADE

    program_id BIGINT  
        NOT NULL 
        REFERENCES programs(id)
        ON DELETE CASCADE,

    status VARCHAR(30)
        DEFAULT '',

    joined_at DATE 
        DEFAULT CURRENT_DATE,
    
    notes TEXT 
        DEFAULT ''
)

CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,

    school_id BIGINT 
        NOT NULL
        REFERENCES schools(id)
        ON DELETE CASCADE,

    teacher_id BIGINT
        NOT NULL
        REFERENCES teachers(id)
        ON DELETE CASCADE,

    user_id BIGINT
        NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    program_id BIGINT
        REFERENCES programs(id)
        ON DELETE SET NULL,

    interaction_type VARCHAR(30)
        DEFAULT '',

    subject VARCHAR(255)
        DEFAULT '',

    notes TEXT 
        DEFAULT '',

    interaction_date DATE
        DEFAULT CURRENT_DATE,

    created_at TIMESTAMP 
        DEFAULT CURRENT_TIMESTAMP

    )


CREATE TABLE tasks (
    id SERIAL PRIMARY KEY
    
    title VARCHAR(255)
        UNIQUE
        NOT NULL, 

    description TEXT
        DEFAULT '',

    school_id BIGINT
        REFERENCES schools(id)
        ON DELETE SET NULL,

    teacher_id BIGINT 
        REFERENCES teachers(id)
        ON DELETE SET NULL,

    assigned_to BIGINT 
        NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE, 

    due_date DATE 
        DEFAULT CURRENT_DATE,

    status VARCHAR(30)
        DEFAULT '',
    
    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP

)