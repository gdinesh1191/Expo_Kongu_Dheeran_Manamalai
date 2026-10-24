import { ImageSourcePropType } from "react-native";

export const FEED_ADMIN = {
  name: "Kongu Dheeran Manamalai",
  handle: "kongudheeran",
  photo: require("../assets/Images/Logo_bg.png") as ImageSourcePropType,
};

export type FeedPost = {
  id: string;
  text: string;
  timeAgo: string;
  media:
    | { type: "image"; source: ImageSourcePropType }
    | { type: "video"; uri: string };
};

const FLOWER_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const BUNNY_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
const CLIP_VIDEO = "https://download.samplelib.com/mp4/sample-5s.mp4";

export const FEED_POSTS: FeedPost[] = [
  {
    id: "post-flowers-video",
    text: "Flowers lined the path at this week's community gathering. A short clip from the venue.",
    timeAgo: "2h",
    media: { type: "video", uri: FLOWER_VIDEO },
  },
  {
    id: "post-river",
    text: "A calm spot around Kongu after the climb. Sharing it for families planning a quiet day out.",
    timeAgo: "5h",
    media: { type: "image", source: require("../assets/posts/river.jpg") },
  },
  {
    id: "post-bunny-video",
    text: "A light moment from the evening meet. Tap to watch.",
    timeAgo: "8h",
    media: { type: "video", uri: BUNNY_VIDEO },
  },
  {
    id: "post-falls",
    text: "After the rain, the falls near our region turned green. Photo shared by the community desk.",
    timeAgo: "1d",
    media: { type: "image", source: require("../assets/posts/falls.jpg") },
  },
  {
    id: "post-clip-video",
    text: "Today's update from the event grounds. Video stays paused until you tap play.",
    timeAgo: "1d",
    media: { type: "video", uri: CLIP_VIDEO },
  },
  {
    id: "post-bloom",
    text: "The fields bloomed overnight. Wishing every family a good season.",
    timeAgo: "2d",
    media: { type: "image", source: require("../assets/posts/fields.jpg") },
  },
  {
    id: "post-kitchen",
    text: "Community lunch preparations are underway. More updates will be posted from this account.",
    timeAgo: "3d",
    media: { type: "image", source: require("../assets/posts/grain.jpg") },
  },
];
