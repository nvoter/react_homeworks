import axios from 'axios';
import { Request, Response } from 'express';
import { Post } from '../types/Post';

export const getPostById = async (req: Request, res: Response) => {
    const id = req.params["id"];
    try {
        const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.sendStatus(500);
    }
} 