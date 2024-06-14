const createclockTableQuery = `CREATE TABLE IF NOT EXISTS clockinout (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    inTime VARCHAR(255),
    outTime VARCHAR(255),
    clockStatus VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    isActive TINYINT(1) DEFAULT 1, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_completed TINYINT(0) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

const insertTime = `INSERT INTO clockinout (inTime, outTime, user_id,clockStatus,date) VALUES (?, ?, ?,?,?)`;

const previousPunch = `select * from clockinout where user_id=? and date=? and is_completed=0 order by id desc`;

const getAllTimeData = `select u.name,ci.* from clockinout ci
left join users u on u.id=ci.user_id
where ci.user_id=? and ci.isActive=1 order by id desc;
`;

const updateTime = `UPDATE clockinout
SET inTime = ?, outTime=? , clockStatus=?
WHERE id = ?;
`;

const updateOutTime = `UPDATE clockinout
SET  outTime=? , clockStatus=? , is_completed=?
WHERE id = ?`;

export {
  createclockTableQuery,
  insertTime,
  previousPunch,
  getAllTimeData,
  updateTime,
  updateOutTime,
};
