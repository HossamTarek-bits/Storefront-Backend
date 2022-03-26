import client from '../../../database';

const deleteAll = async () => {
  const con = await client.connect();
  await con.query('DELETE FROM order_products');
  await con.query('DELETE FROM products');
  await con.query('DELETE FROM orders');
  await con.query('DELETE FROM users');
  con.release();
};

export default deleteAll;
