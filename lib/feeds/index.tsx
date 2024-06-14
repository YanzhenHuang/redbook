import { pb } from "@/lib/db_config";
import { ListResult } from "pocketbase";
import { IFeedPost, IFeedsFetch } from "@/types";

export const FetchFeeds = async (): Promise<ListResult<IFeedsFetch>> => {
    return pb.collection<IFeedsFetch>('feeds').getList(1, 50, {
        sort: "-created"
    });
}

export const PostFeed = async (data: IFeedPost): Promise<any> => {
    return pb.collection<IFeedPost>('feeds').create(data);
}

export const getFeedInfo = async (id: string): Promise<IFeedsFetch> => {
    return pb.collection<IFeedsFetch>('feeds').getOne(id, { expand: 'id,uid,title,content,photo,public,created,updated' });
}