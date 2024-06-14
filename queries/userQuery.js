const createuserTable = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isActive TINYINT(1) DEFAULT 1, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const insert = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

const activeUser = `select * from users where email=? and isActive=1`;

const getUserbyid = `SELECT * FROM users WHERE id = ?`;

export { createuserTable, insert, activeUser, getUserbyid };
