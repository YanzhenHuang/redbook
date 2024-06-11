import { pb } from "@/lib/db_config";
import { ListResult } from "pocketbase";
import { IFeedsFetch } from "@/types";

export const FetchFeeds = async (): Promise<ListResult<IFeedsFetch>> => {
    return pb.collection<IFeedsFetch>('feeds').getList(1, 50);
}