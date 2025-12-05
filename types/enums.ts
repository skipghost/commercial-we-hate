export enum UserRoleEnum {
  USER = "user",
  ADMIN = "admin",
  PRIMARY_ADMIN = "primary-admin",
}

export enum PostCategoryEnum {
  NATIONAL_COMMERCIALS = "national-commercials",
  YOUTUBE_COMMERCIALS = "youtube-commercials",
  LOCAL_COMMERCIALS = "local-commercials",
  AUDIO_COMMERCIALS = "audio-commercials",
  CLASSIC_COMMERCIALS = "classic-commercials",
}

export enum Mode {
  LOVE = "love",
  HATE = "hate",
}

export enum ReportsStatusEnum {
  PENDING = "pending",
  REVIEWED = "reviewed",
  DISMISSED = "dismissed",
}

export enum ReportsReasonEnum {
  SPAM = "spam",
  HARASSMENT = "harassment",
  HATE_SPEECH = "hate_speech",
  SEXUALLY_EXPLICIT = "sexually_explicit",
  VIOLENCE = "violence",
  INAPPROPRIATE = "inappropriate",
  COPYRIGHT = "copyright_violation",
  MISINFORMATION = "misinformation",
  OTHER = "other",
}

export enum RequestStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Resolved = "resolved",
  Rejected = "rejected",
}

export enum CommentableModels {
  POST = "Post",
  BULLETIN_BOARD = "BulletinPost",
}

