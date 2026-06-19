export interface CovrdResult {
  matchScore: number;
  coverLetter: string;
  missingKeywords: string[];
  presentKeywords: string[];
  improvementTips: string[];
}

export interface GenerateRequest {
  jobDescription: string;
  cvText: string;
}

export interface ApiError {
  error: string;
}
