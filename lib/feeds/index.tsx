import { pb } from "@/lib/db_config";
import { ListResult } from "pocketbase";
import { IFeedPost, IFeedsFetch } from "@/types";

export const FetchFeeds = async (range?: { number: number, perPage: number }, filter?: string): Promise<ListResult<IFeedsFetch>> => {
    let { number: from, perPage: to } = range || { number: 1, perPage: 50 };

    return pb.collection<IFeedsFetch>('feeds').getList(from, to, {
        sort: "-created",
        filter: filter || "public=true || public=false"
    });
}

export const PostFeed = async (data: IFeedPost): Promise<IFeedPost> => {
    return pb.collection<IFeedPost>('feeds').create(data);
}

export const getFeedInfo = async (id: string): Promise<IFeedsFetch> => {
    return pb.collection<IFeedsFetch>('feeds').getOne(id, { expand: 'id,uid,title,content,photo,public,created,updated' });
}

export const DeleteFeed = async (id: string): Promise<boolean | { code: number, message: string, data: any }> => {
    return pb.collection('feeds').delete(id);
}