import { ReportsReasonEnum } from "@/types/enums";

export default [
  { label: "Spam / Promotional", value: ReportsReasonEnum.SPAM },
  { label: "Harassment / Bullying", value: ReportsReasonEnum.HARASSMENT },
  { label: "Hate Speech / Discrimination", value: ReportsReasonEnum.HATE_SPEECH },
  { label: "Sexually Explicit Content", value: ReportsReasonEnum.SEXUALLY_EXPLICIT },
  { label: "Violence / Graphic Content", value: ReportsReasonEnum.VIOLENCE },
  { label: "Inappropriate Content", value: ReportsReasonEnum.INAPPROPRIATE },
  { label: "Copyright Violation", value: ReportsReasonEnum.COPYRIGHT },
  { label: "Misinformation / False Info", value: ReportsReasonEnum.MISINFORMATION },
  { label: "Other", value: ReportsReasonEnum.OTHER },
];

