import { IFeedsFetch } from "@/types";
import { BASE_FILES } from "@/lib/db_config";
import { HiHeart } from "react-icons/hi2";
import Link from "next/link";


/**
 * A card component for a feed item.
 * @param props 
 * @prop {number} index - The index of the feed item defined by the map function.
 * @prop {IFeedsFetch} item - The feed data structure passed from the map function.
 * @prop {number} numLikes - The number of likes for the feed item.
 * @returns 
 */
export const Feed = (props: { index: number, item: IFeedsFetch, numLikes?: number }) => {
    return (
        <div key={props.index} className={"w-56 hover:scale-[1.02] hover:cursor-pointer transition-all"}>
            <Link href={`/feed/${props.item.id}`} className={"w-full h-full"}>
                {/* Image */}
                <img
                    src={props.item.photo ? `${BASE_FILES}/${props.item.id}/${props.item.photo}` : props.item.photoURL}
                    className={"rounded-2xl h-80 object-cover"} />

                {/* Information */}
                <div className={"mt-3"}>
                    {/* Title */}
                    <div className={"pl-4 pr-4 text-clip text-lg"}>
                        {props.item.title}
                    </div>

                    {/* Status */}
                    <div className={"mt-1 pl-3.5 pr-3 flex flex-row gap-2 justify-between"}>
                        {/* User Name */}
                        <div className={'flex flex-row gap-2 items-center text-sm'}>
                            <div className={"rounded-full w-6 h-6 bg-themeColorUltraLight"}></div>
                            <div className={"text-gray-500"}>User Name</div>
                        </div>

                        {/* Likes */}
                        <div className={"flex flex-row gap-1 items-center text-gray-500"}>
                            <HiHeart />
                            <p>{props.numLikes || 0}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}