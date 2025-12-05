import { Mode } from "@/types/enums";

export type FAQ = {
  question: string;
  answer: string;
};

export type FAQCategories = Mode;

export type FAQS = {
  [key in FAQCategories]: FAQ[];
};

const faqs: FAQS = {
  love: [
    {
      question: "What is Commercials We Love?",
      answer:
        "This website is for sharing and celebrating commercials that you enjoy, find creative, nostalgic, funny, or inspiring.",
    },
    {
      question: "Can I post any type of commercial here?",
      answer:
        "Yes, you can post from any category — TV, YouTube, local, audio, or classic — as long as you think it deserves some love.",
    },
    {
      question: "How do I interact with posts?",
      answer:
        "You can upvote, comment, and share commercials you like. Joining discussions helps highlight the best ads.",
    },
    {
      question: "Why are some commercials tagged as 'Admin Selections'?",
      answer:
        "Those are hand-picked by our team to showcase iconic or especially memorable commercials we think the community will enjoy.",
    },
    {
      question: "Can I post old commercials?",
      answer:
        "Absolutely. Nostalgia is a big part of why people love ads. Share anything from vintage spots to recent campaigns.",
    },
    {
      question: "How do I credit the brand or creator?",
      answer:
        "You can mention the brand in your title or description. Adding source links is also encouraged when available.",
    },
    {
      question: "Are memes or parodies allowed here?",
      answer:
        "Yes, if they celebrate the commercial in a fun way. Just make sure the original ad is referenced clearly.",
    },
    {
      question: "Do upvotes matter?",
      answer:
        "Yes, posts with more upvotes appear higher on the feed, helping the community discover the best commercials faster.",
    },
    {
      question: "Can I favorite commercials I love?",
      answer: "Yes, you can save posts to your profile and revisit your favorites anytime.",
    },
    {
      question: "Is discussion encouraged?",
      answer: "Definitely. Share why you like a commercial, its impact, or personal stories tied to it.",
    },
    {
      question: "What makes a good 'love' post?",
      answer: "Clear titles, embedded video links, and short explanations of why you enjoyed it work best.",
    },
    {
      question: "Can I compare commercials?",
      answer: "Yes, you can create posts comparing different ads and ask the community to vote on which is better.",
    },
    {
      question: "Do likes on comments help visibility?",
      answer: "Yes, the most liked comments appear at the top, making thoughtful discussions more visible.",
    },
    {
      question: "Can I share regional commercials?",
      answer: "Of course. Local commercials that made you smile often do the same for others.",
    },
  ],
  hate: [
    {
      question: "What is Commercials We Hate?",
      answer:
        "This website is for commercials that annoy you, play too often, or just don’t land well. It’s a place to vent and commiserate.",
    },
    {
      question: "Are negative posts allowed here?",
      answer:
        "Yes, but keep it about the commercial itself. Criticism is welcome, personal attacks or harassment are not.",
    },
    {
      question: "Can I still upvote or downvote here?",
      answer:
        "Absolutely. Upvote posts you agree with or find funny, and downvote ones that don’t add much to the conversation.",
    },
    {
      question: "What if a post crosses the line?",
      answer: "Use the report button. Moderators will review and remove posts that break community guidelines.",
    },
    {
      question: "Why do people post 'hate' commercials?",
      answer:
        "It’s a way to share frustrations and laugh at how annoying some ads can be when they’re overplayed or poorly made.",
    },
    {
      question: "Can I post commercials I dislike even if others love them?",
      answer: "Yes, different opinions are part of the fun. Just explain why it bothers you.",
    },
    {
      question: "Is sarcasm or humor okay in posts?",
      answer: "Yes, as long as it’s directed at the commercial and not at other users.",
    },
    {
      question: "Do downvotes mean a post gets deleted?",
      answer: "No, downvotes only affect visibility. Posts are removed only if they break community rules.",
    },
    {
      question: "Can I post multiple commercials I hate in one thread?",
      answer:
        "It’s best to post one commercial per thread so discussions stay focused, but themed collections are fine occasionally.",
    },
    {
      question: "Can I complain about jingles?",
      answer: "Definitely. Annoying jingles are one of the most common reasons commercials end up here.",
    },
    {
      question: "What about commercials that are offensive?",
      answer:
        "Yes, those are welcome here as long as you describe why they’re problematic. Offensive content will be moderated if it crosses guidelines.",
    },
    {
      question: "Do I have to post a video link?",
      answer:
        "It’s recommended so others can see the ad you’re talking about. Screenshots or descriptions work if no link is available.",
    },
    {
      question: "Why do some hate posts get a lot of upvotes?",
      answer: "Usually because many people share the same frustration or find the rant entertaining.",
    },
    {
      question: "Can I downvote a 'love' post if I hate the ad?",
      answer: "Yes, voting is part of community expression. But consider commenting to explain your perspective.",
    },
  ],
};

export default faqs;

