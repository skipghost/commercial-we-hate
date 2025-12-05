import { Dot } from "lucide-react";

import { INFO } from "@/constants";

const UserAgreementContent = () => {
  return (
    <section className="padding-y">
      <div className="container-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-5">User Agreement</h1>
          <p className="mb-6">
            This User Agreement ("Agreement") outlines the terms under which you may access and use {INFO.WEBSITE_URL}{" "}
            ("the Site") operated by {INFO.BUSINESS_NAME} ("we," "us," or "our"). By using this Site, you agree to
            comply with and be legally bound by this Agreement.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Eligibility</h3>
          <p className="mb-4">
            You must be at least 13 years old to use this Site. By using the Site, you represent that you meet this
            requirement.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Account Responsibility</h3>
          <p className="mb-4">
            If you create an account on the Site, you are responsible for maintaining the confidentiality of your
            account and password, and for all activities that occur under your account.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">User-Generated Content</h3>
          <p className="mb-4">
            You may post reviews, comments, and links to commercials. By doing so, you grant us a worldwide,
            royalty-free license to use, display, and distribute that content. We reserve the right to moderate or
            remove content that violates our policies or community guidelines.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Acceptable Use</h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              "Respect other users and their opinions.",
              "Do not post misleading, false, or offensive content.",
              "Do not harass or threaten other users.",
              "Do not use the platform for illegal or unauthorized purposes.",
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

          <h3 className="text-xl md:text-2xl font-medium mb-2">Community Voting and Ratings</h3>
          <p className="mb-4">
            Voting on content is intended to reflect the opinion of the community. Abuse of this feature, including vote
            manipulation or the use of fake accounts, is strictly prohibited.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Content Removal</h3>
          <p className="mb-4">
            We may remove or disable access to content we believe violates this Agreement or is otherwise harmful,
            without prior notice.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Termination</h3>
          <p className="mb-4">
            We may suspend or terminate your access to the Site if you violate this Agreement, cause legal risk, or
            disrupt the platform’s integrity.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Modifications to Agreement</h3>
          <p className="mb-4">
            We reserve the right to change this User Agreement at any time. Updates will be posted to this page with a
            revised effective date.
          </p>

          <h3 className="text-xl md:text-2xl font-medium mb-2">Contact Information</h3>
          <p className="mb-4">For questions or concerns regarding this User Agreement, please reach out to us:</p>

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

export default UserAgreementContent;

