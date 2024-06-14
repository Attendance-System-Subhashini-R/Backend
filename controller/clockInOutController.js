import connection from "../db.mjs";
import {
  createclockTableQuery,
  getAllTimeData,
  insertTime,
  previousPunch,
  updateOutTime,
  updateTime,
} from "../queries/clockInOutQuery.js";

const createClockTable = async () => {
  try {
    await connection.execute(createclockTableQuery);
    console.log("Table created or already exists.");
  } catch (error) {
    console.error("Error creating  table:", error.message);
  }
};

const createInOut = async (req, res) => {
  try {
    const { inTime, outTime, clockStatus, date } = req.body;

    const user_id = req.user.id;

    let [findExist] = await connection.execute(previousPunch, [user_id, date]);

    if (findExist?.length > 0) {
      let data = await connection.execute(updateOutTime, [
        outTime,
        clockStatus,
        1,
        findExist[0]?.id,
      ]);

      if (data) {
        return res.status(200).json({
          status: true,
          message: "OutTime updated successfully",
          data: data,
        });
      }
    }

    let [insertData] = await connection.execute(insertTime, [
      inTime,
      outTime,
      user_id,
      clockStatus,
      date,
    ]);

    if (insertData) {
      return res.status(200).json({
        status: true,
        message: "Data created successfully",
        data: insertData?.insertedId,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(400).json({
      status: true,
      message: error.message,
    });
  }
};

const getAllClockData = async (req, res) => {
  try {
    let id = req.user.id;
    const [rows] = await connection.execute(getAllTimeData, [id]);
    return res.status(200).json({
      status: true,
      message: "Clock data fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

const updateInOut = async (req, res) => {
  try {
    const { id } = req.query;
    const { inTime, outTime, clockStatus } = req.body;

    let [updateData] = await connection.execute(updateTime, [
      inTime,
      outTime,
      clockStatus,
      id,
    ]);

    if (updateData) {
      return res.status(200).json({
        status: true,
        message: "Data updated successfully",
        data: updateData,
      });
    }
  } catch (error) {
    console.error("Error updating time:", error.message);
    return res.status(400).json({
      status: true,
      message: error.message,
    });
  }
};

export { createClockTable, createInOut, getAllClockData, updateInOut };
