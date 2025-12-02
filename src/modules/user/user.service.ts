import { pool } from "../../config/db";

const createUser = async (body: {
  name: string;
  email: string;
  age: number;
}) => {
  const { name, email, age } = body;
  const result = await pool.query(
    `INSERT INTO users(name, email, age) VALUES($1,$2, $3) RETURNING *`,
    [name, email, age]
  );
  return result;
};

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (
  id: string,
  body: { name: string; email: string }
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [body.name, body.email, id]
  );
  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
