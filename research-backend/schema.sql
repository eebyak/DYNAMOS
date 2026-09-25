PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS contributions (
  submission_id TEXT PRIMARY KEY,
  withdrawal_token_hash TEXT NOT NULL UNIQUE,
  model_version TEXT NOT NULL,
  questionnaire_version TEXT NOT NULL,
  derivation_version TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  scope_json TEXT NOT NULL,
  scores_json TEXT NOT NULL,
  overall_fit TEXT,
  missing_gate TEXT,
  received_month TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contributions_versions
  ON contributions(model_version, questionnaire_version, derivation_version);

CREATE TABLE IF NOT EXISTS presented_precepta (
  submission_id TEXT NOT NULL,
  pattern_id TEXT NOT NULL,
  presentation_status TEXT NOT NULL,
  rank INTEGER NOT NULL,
  PRIMARY KEY (submission_id, pattern_id),
  FOREIGN KEY (submission_id) REFERENCES contributions(submission_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pattern_feedback (
  submission_id TEXT NOT NULL,
  pattern_id TEXT NOT NULL,
  response TEXT NOT NULL,
  PRIMARY KEY (submission_id, pattern_id),
  FOREIGN KEY (submission_id) REFERENCES contributions(submission_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS missing_patterns (
  submission_id TEXT NOT NULL,
  pattern_id TEXT NOT NULL,
  PRIMARY KEY (submission_id, pattern_id),
  FOREIGN KEY (submission_id) REFERENCES contributions(submission_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS followups (
  submission_id TEXT NOT NULL,
  pattern_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  response TEXT NOT NULL,
  PRIMARY KEY (submission_id, question_id),
  FOREIGN KEY (submission_id) REFERENCES contributions(submission_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_presented_pattern ON presented_precepta(pattern_id);
CREATE INDEX IF NOT EXISTS idx_feedback_pattern ON pattern_feedback(pattern_id, response);
CREATE INDEX IF NOT EXISTS idx_missing_pattern ON missing_patterns(pattern_id);
