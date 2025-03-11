import { getPostById } from "../methods/getPostById";
import { getAllPosts } from "../methods/getAllPosts";

export const postsController = {
    getPostById: getPostById,
    getAllPosts: getAllPosts,
}