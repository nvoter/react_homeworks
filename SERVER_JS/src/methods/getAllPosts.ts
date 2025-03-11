import axios from 'axios';
import { Request, Response } from 'express';
import { Post } from '../types/Post';

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.sendStatus(500);
    }
} 