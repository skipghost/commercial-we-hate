import { Mode } from "@/types/enums";

export const INFO = {
  PHONE_NUMBER: "+1 (916) 792-7076",
  EMAIL_ADDRESS: "info@commercialswehate.com",
  BUSINESS_NAME: "Commercials We Hate",
  WEBSITE_URL: "https://commercialswehate.com",
  ADMIN_EMAILS: ["amir@truesocialmarketing.com"],
  MODES: {
    [Mode.LOVE]: {
      title: "Commercials We Love",
      about: {
        heading: "The Ads That Make Us Smile",
        description:
          "Welcome to Commercials We Love, a place to celebrate commercials that inspire, entertain, or just make you laugh. Share your favorites, discuss what makes them memorable, and connect with others who enjoy clever, creative, and unforgettable ads.",
        additional:
          "This is where the community highlights ads that brighten our day, spark discussion, and remind us that marketing can be fun, imaginative, and memorable.",
        imgSrc: "/about-love.png",
      },
      whyJoin: {
        heading: "Why We Admire These Ads",
        description:
          "Become part of a community that values creativity, humor, and the joy of great commercials. Share your thoughts, discover hidden gems, and connect with others who appreciate clever marketing.",
        additional:
          "Participate in discussions, vote on your favorites, and be part of a platform that celebrates the ads that bring a smile to everyone’s face.",
        imgSrc: "/why-join-love.png",
      },
      howToEngage: {
        heading: "How to Participate",
        description:
          "Engage with ads by voting for your favorites, sharing them with friends, or commenting on what makes them stand out.",
        additional:
          "Every interaction helps highlight the best commercials and sparks conversation. Your votes and shares guide the community to the ads that truly shine.",
        imgSrc: "/engage-love.png",
      },
    },
    [Mode.HATE]: {
      title: "Commercials We Hate",
      about: {
        heading: "The Ads That Make Us Cringe",
        description:
          "Welcome to Commercials We Hate, where we share and discuss commercials that annoy, frustrate, or make you roll your eyes. Voice your opinions, read what others think, and explore the ads that spark strong reactions.",
        additional:
          "This is the place to highlight commercials that irritate, amuse, or provoke, showing how marketing can sometimes be frustrating yet entertaining.",
        imgSrc: "/about-hate.png",
      },
      whyJoin: {
        heading: "Why We Love to Hate Ads",
        description:
          "Join a community that’s honest about what annoys or frustrates. Share your thoughts on the most irritating ads, read reactions from others, and explore the commercials everyone loves to hate.",
        additional:
          "Engage in discussions, vote on the worst offenders, and see how marketing can sometimes go hilariously wrong while connecting with others who get it.",
        imgSrc: "/why-join-hate.png",
      },
      howToEngage: {
        heading: "How to Participate",
        description:
          "Interact with ads by voting for the most annoying ones, sharing them, or leaving your comments on why they bother you.",
        additional:
          "Your actions help the community identify the ads that really frustrate viewers and spark conversations. Every vote and share makes a difference.",
        imgSrc: "/engage-hate.png",
      },
    },
  },
};

