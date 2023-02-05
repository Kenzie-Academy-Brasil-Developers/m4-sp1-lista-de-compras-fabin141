import express, { Application, json, Request, Response } from "express";
import { list } from "./db";
import {
    deleteItemOfPurchaseList,
    getAllPurchaseList,
    getPurchaseListById,
    patchItemOfPurchaseList,
    postPurshaseList,
} from "./logic";
import { validateDataGetPurchaseListById } from "./validate";

const app: Application = express();
app.use(json());

const port: number = 3000;
const msg: string = `Server is running on http://localhost:${port}`;
let id = 0;

app.listen(port, () => {
    console.log(msg);
});

app.post("/purchaseList", postPurshaseList);

app.get("/purchaseList", getAllPurchaseList);

app.get("/purchaseList/:id", getPurchaseListById);

app.patch("/purchaseList/:id/:itemName", patchItemOfPurchaseList);

app.delete("/purchaseList/:id/:itemName", deleteItemOfPurchaseList);

app.delete("/purchaseList/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const purchaseList = validateDataGetPurchaseListById(id);

        const index = list.findIndex(
            (el) => el.listName == purchaseList.listName
        );
        list.splice(index, 1);

        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});