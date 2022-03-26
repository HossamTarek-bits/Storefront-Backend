import client from "../database";
export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

/**
 * A Model Class for Table Products
 */
export default class ProductStore {
  /**
   * Get all Products from database.
   * @return {Promise<Product[]>}
   */
  async index(): Promise<Product[]> {
    try {
      const con = await client.connect();
      const query = "SELECT * FROM products;";
      const result = await con.query(query);
      con.release();
      const p: Product[] = [];
      for (let i = 0; i < result.rowCount; i++) {
        p.push({
          id: parseInt(result.rows[i].id),
          name: result.rows[i].name,
          price: parseInt(result.rows[i].price),
          category: result.rows[i].category,
        });
      }
      return p;
    } catch (err) {
      throw new Error(`Couldn't get all products from database, Error ${err}`);
    }
  }

  /**
   * Get a Product with specific id
   * @param {number} id -> Product Id
   * @return {Product}
   */
  async show(id: number): Promise<Product> {
    try {
      const con = await client.connect();
      const query = "SELECT * FROM products WHERE id = ($1);";
      const result = await con.query(query, [id]);
      con.release();
      const p: Product = {
        id: parseInt(result.rows[0].id),
        name: result.rows[0].name,
        price: parseInt(result.rows[0].price),
        category: result.rows[0].category,
      };
      return p;
    } catch (err) {
      throw new Error(
        `Couldn't get product with id ${id} from database, Error ${err}`
      );
    }
  }

  /**
   * Get a Product with category
   * @param {string} category -> Product Id
   * @return {Product[]}
   */
  async showByCategory(category: string): Promise<Product[]> {
    try {
      const con = await client.connect();
      const query = "SELECT * FROM products WHERE category = ($1);";
      const result = await con.query(query, [category]);
      con.release();
      const p: Product[] = [];
      for (let i = 0; i < result.rowCount; i++) {
        p.push({
          id: parseInt(result.rows[i].id),
          name: result.rows[i].name,
          price: parseInt(result.rows[i].price),
          category: result.rows[i].category,
        });
      }
      return p;
    } catch (err) {
      throw new Error(
        `Couldn't get products with category ${category} from database, Error ${err}`
      );
    }
  }

  /**
   * Create a new product in database and return the newly created product
   * @param {Product} product -> Product to be created
   * @return {Promise<Product>} -> Created Product
   */
  async create(product: Product): Promise<Product> {
    try {
      const con = await client.connect();
      const query =
        "INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *;";
      const result = await con.query(query, [
        product.name,
        product.price,
        product.category,
      ]);
      con.release();
      const p: Product = {
        id: parseInt(result.rows[0].id),
        name: result.rows[0].name,
        price: parseInt(result.rows[0].price),
        category: result.rows[0].category,
      };
      return p;
    } catch (err) {
      throw new Error(`Couldn't create a new product, Error ${err}`);
    }
  }
}
