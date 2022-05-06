"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.listen(process.env.PORT || 3001, () => {
    "server started";
});
const username = process.env.mongoClient;
const password = process.env.mongoPassword;
const uri = `mongodb+srv://${username}:${password}@clientdata.dluae.mongodb.net/DB?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri);
client.connect((errs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (errs)
            throw errs;
        app.get("/getClient/:customerId", (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
            const collection = client.db("DB").collection('clients');
            const customerId = +req.params.customerId;
            if (isNaN(customerId)) {
                res.status(404).json({ err: "El cliente introducido tiene que ser numérico." });
            }
            else {
                const clientData = yield getClient(collection, customerId);
                // if (err) throw err;
                if (clientData.length) {
                    res.status(200).json(clientData[0]);
                }
                else {
                    res.status(404).json({ err: `No se encontro el cliente ${customerId}` });
                }
            }
        }));
        app.get("/getProducts", (_, res, err) => __awaiter(void 0, void 0, void 0, function* () {
            const collection2 = client.db("DB").collection('products');
            const bestProducts = yield getProducts(collection2);
            // if (err) throw err;
            if (bestProducts) {
                res.status(200).json(bestProducts);
            }
            else {
                res.status(404).json({ err: `No se encontraron los productos` });
            }
        }));
        app.get("/getProductsMonth", (_, res, err) => __awaiter(void 0, void 0, void 0, function* () {
            const collection2 = client.db("DB").collection('bestLastMonth');
            const bestProducts = yield getProducts(collection2);
            // if (err) throw err;
            if (bestProducts) {
                res.status(200).json(bestProducts);
            }
            else {
                res.status(404).json({ err: `No se encontraron los productos` });
            }
        }));
    }
    catch (errr) {
        console.log("Ocurrio un Error ****** ->", errr, errs);
    }
}));
const getClient = (collection, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.find({ customerId }).toArray();
});
const getProducts = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.find({}).toArray();
});
//# sourceMappingURL=index.js.map