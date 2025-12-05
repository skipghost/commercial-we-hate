import { Dot } from "lucide-react";

import { INFO } from "@/constants";

const CommunityGuidelinesContent = () => {
  return (
    <section className="padding-y">
      <div className="container-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-5">Community Guidelines</h1>
          <p className="mb-6">
            At {INFO.BUSINESS_NAME}, we’re building a space for honest, respectful, and thoughtful discussion about
            commercials. These Community Guidelines outline the standards for participating on {INFO.WEBSITE_URL} ("the
            Site"). By using the Site, you agree to follow these rules to keep the community safe and constructive.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Be Respectful</h3>
          <p className="mb-4">
            Treat all users with courtesy. Differences in opinion are welcome, but personal attacks, harassment, or
            discrimination will not be tolerated.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Share Constructive Feedback</h3>
          <p className="mb-4">
            Whether you love or hate a commercial, keep your feedback focused on the ad—not the people who made it or
            posted it.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Content Guidelines</h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              "No hate speech, bullying, or threats.",
              "Avoid posting misleading or false information.",
              "No spam, self-promotion, or commercial solicitation.",
              "Don't post graphic, violent, or adult content.",
              "Avoid reposting content that has already been removed.",
            ].map((item) => (
              <li
                key={item}
                className="flex"
              >
                <Dot className="flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Voting & Reporting</h3>
          <p className="mb-4">
            Our voting system is here to elevate quality discussion. Vote honestly, and don’t manipulate votes through
            multiple accounts or coordination. Report content that violates these guidelines.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Moderator Action</h3>
          <p className="mb-4">
            We reserve the right to remove content or suspend users who violate these guidelines. Repeat offenses may
            result in a permanent ban.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Help Keep It Fun</h3>
          <p className="mb-4">
            This community thrives on humor, opinions, and shared frustration with bad ads. Keep it funny, weird,
            insightful—but respectful.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Updates to Guidelines</h3>
          <p className="mb-4">
            We may update these Community Guidelines as the platform grows. Check back occasionally to stay informed.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Contact Us</h3>
          <p className="mb-4">Questions or feedback? Reach out anytime:</p>

          <ul className="flex flex-col gap-2">
            <li className="flex gap-2">
              <b>Phone:</b> {INFO.PHONE_NUMBER}
            </li>
            <li className="flex gap-2">
              <b>Email:</b> {INFO.EMAIL_ADDRESS}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CommunityGuidelinesContent;

