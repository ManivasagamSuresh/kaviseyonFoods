import { DBconnect, closeConnection } from '@/MongoDb/mongoDb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const db = await DBconnect();
        const products = await db?.collection('products').find({}).toArray();
        console.log(products);
        await closeConnection();
        return new NextResponse(JSON.stringify(products), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse('Error occurred', { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const db = await DBconnect();
        const product = await db?.collection('products').insertOne(data);
        console.log(product);
        await closeConnection();
        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse('Error occurred', { status: 500 });
    }
};
