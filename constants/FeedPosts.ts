import { ImageSourcePropType } from "react-native";
import { MY_PROFILE, SAMPLE_PROFILES } from "./SampleProfile";

export type FeedPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: ImageSourcePropType;
  location: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  match: boolean;
  nearby: boolean;
  media:
    | { type: "image"; source: ImageSourcePropType }
    | { type: "video"; uri: string };
};

const FLOWER_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const BUNNY_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
const CLIP_VIDEO = "https://download.samplelib.com/mp4/sample-5s.mp4";

function author(id: string) {
  const person = [...SAMPLE_PROFILES, MY_PROFILE].find((item) => item.id === id);
  if (!person || person.photo == null || typeof person.photo === "string") {
    throw new Error(`Feed author ${id} needs a bundled photo`);
  }
  return { id: person.id, name: person.name, photo: person.photo, location: person.location };
}

const durga = author("TG30930");
const vidhya = author("GT30933");
const preetha = author("TG30929");
const monica = author("30937");
const vinupriya = author("30932");
const kumaresan = author("33246");

export const FEED_POSTS: FeedPost[] = [
  {
    id: "post-flowers-video",
    authorId: vidhya.id,
    authorName: vidhya.name,
    authorPhoto: vidhya.photo,
    location: vidhya.location,
    caption: "These were everywhere on the way home.",
    likes: 128,
    comments: 14,
    timeAgo: "2 hours ago",
    match: false,
    nearby: true,
    media: { type: "video", uri: FLOWER_VIDEO },
  },
  {
    id: "post-river",
    authorId: durga.id,
    authorName: durga.name,
    authorPhoto: durga.photo,
    location: durga.location,
    caption: "Stopped for this view. Worth the climb.",
    likes: 246,
    comments: 31,
    timeAgo: "5 hours ago",
    match: true,
    nearby: false,
    media: { type: "image", source: require("../assets/posts/river.jpg") },
  },
  {
    id: "post-bunny-video",
    authorId: preetha.id,
    authorName: preetha.name,
    authorPhoto: preetha.photo,
    location: preetha.location,
    caption: "A light one for the evening.",
    likes: 89,
    comments: 6,
    timeAgo: "8 hours ago",
    match: false,
    nearby: false,
    media: { type: "video", uri: BUNNY_VIDEO },
  },
  {
    id: "post-falls",
    authorId: monica.id,
    authorName: monica.name,
    authorPhoto: monica.photo,
    location: monica.location,
    caption: "After the rain. The whole place turned green.",
    likes: 312,
    comments: 27,
    timeAgo: "1 day ago",
    match: true,
    nearby: true,
    media: { type: "image", source: require("../assets/posts/falls.jpg") },
  },
  {
    id: "post-clip-video",
    authorId: vinupriya.id,
    authorName: vinupriya.name,
    authorPhoto: vinupriya.photo,
    location: vinupriya.location,
    caption: "A short clip from today.",
    likes: 64,
    comments: 4,
    timeAgo: "1 day ago",
    match: false,
    nearby: true,
    media: { type: "video", uri: CLIP_VIDEO },
  },
  {
    id: "post-bloom",
    authorId: kumaresan.id,
    authorName: kumaresan.name,
    authorPhoto: kumaresan.photo,
    location: kumaresan.location,
    caption: "Bloomed overnight.",
    likes: 175,
    comments: 19,
    timeAgo: "2 days ago",
    match: true,
    nearby: false,
    media: { type: "image", source: require("../assets/posts/fields.jpg") },
  },
  {
    id: "post-kitchen",
    authorId: preetha.id,
    authorName: preetha.name,
    authorPhoto: preetha.photo,
    location: preetha.location,
    caption: "Lunch started here.",
    likes: 203,
    comments: 22,
    timeAgo: "3 days ago",
    match: false,
    nearby: false,
    media: { type: "image", source: require("../assets/posts/grain.jpg") },
  },
];
