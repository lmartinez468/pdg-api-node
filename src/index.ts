import { Collection, MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const app = express()

app.listen(3001, () => {
  "server started in the port 3001"
})

const username = process.env.mongoClient;
const password = process.env.mongoPassword;
const uri = `mongodb+srv://${username}:${password}@clientdata.dluae.mongodb.net/DB?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

client.connect(async (errs: any) => {
  try {
    if (errs) throw errs;

    const collection: Collection = client.db("DB").collection('clients')

    app.get("/getClient/:customerId", async (req, res, err) => {
      const customerId: number = +req.params.customerId;
      if (isNaN(customerId)) {
        res.status(404).json({ err: "El cliente introducido tiene que ser numérico." });

      } else {
        const clientData = await getClient(collection, customerId);
        // if (err) throw err;
        if (clientData.length) {
          res.status(200).json(clientData[0]);
        } else {
          res.status(404).json({ err: `No se encontro el cliente ${customerId}` });
        }
      }
    })

    app.get("/getProducts", async (_, res, err) => {
      const collection2: Collection = await client.db("DB").collection('products')
      const bestProducts = await getProducts(collection2);


      // if (err) throw err;
      if (bestProducts) {
        res.status(200).json(bestProducts);
      } else {
        res.status(404).json({ err: `No se encontraron los productos` });
      }
    })
  } catch (errs) {
    console.log("Ocurrio un Error ->", errs);
  }
});

const getClient = async (collection: Collection, customerId: number) => await
  collection.find({ customerId: customerId }).toArray();

const getProducts = async (collection: Collection) => await
  collection.find({}).toArray();