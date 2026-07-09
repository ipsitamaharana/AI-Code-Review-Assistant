# AI Code Review Assistant — Database Schema

## 1. Purpose

This document defines the final database schema for the AI Code Review Assistant.

The schema is designed to support:

- User authentication and profile management
- Pasted source code submissions
- Uploaded source code files
- Static code analysis results
- AI-based code review results
- Complexity metrics
- Generated documentation
- Review history
- Search and filtering
- Detailed review reports
- Review deletion

The database will use PostgreSQL hosted on Supabase.

## 2. Main Database Tables

The application will use the following six main tables:

1. `users` — Stores user account and profile information.
2. `submissions` — Stores each code submission created by a user.
3. `submission_files` — Stores individual source code files belonging to a submission.
4. `reviews` — Stores the overall result and summary of each completed code review.
5. `review_findings` — Stores individual issues, warnings, bugs, and recommendations found during a review.
6. `complexity_metrics` — Stores code complexity measurements for a review.

The original project manager schema included a `projects` table with a `github_url` field. This design does not use that structure because direct GitHub repository analysis is outside the project scope.

Instead, the `submissions` table represents each code review request. A submission can come from pasted source code or uploaded source code files.

## 3. Table Definitions

### 3.1 `users` Table

The `users` table stores account credentials and profile information for every registered user.

| Column | Data Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | Primary Key, Default `gen_random_uuid()` | Unique identifier for each user |
| `name` | VARCHAR(100) | NOT NULL | User's full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User's login email address |
| `password_hash` | TEXT | NOT NULL | Password securely hashed using bcryptjs |
| `created_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Account creation time |
| `updated_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Last profile update time |

#### Important Security Note

Plain-text passwords must never be stored in the database. The backend will hash every password using bcryptjs before storing it in the `password_hash` column.

### 3.2 `submissions` Table

The `submissions` table stores each code review request created by a user.

| Column | Data Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | Primary Key, Default `gen_random_uuid()` | Unique identifier for each submission |
| `user_id` | UUID | Foreign Key → `users.id`, NOT NULL | User who created the submission |
| `title` | VARCHAR(200) | NOT NULL | User-friendly name for the submission |
| `submission_type` | VARCHAR(20) | NOT NULL | Identifies whether the code was pasted or uploaded |
| `language` | VARCHAR(50) | NOT NULL | Programming language of the submitted code |
| `pasted_code` | TEXT | NULL | Stores code when the user pastes source code directly |
| `status` | VARCHAR(30) | NOT NULL, Default `'pending'` | Current processing status of the submission |
| `created_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Submission creation time |
| `updated_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Last submission update time |

#### Submission Type Rules

The `submission_type` value will be:

- `pasted` — when the user pastes source code directly.
- `uploaded` — when the user uploads one or more source code files.

When `submission_type` is `pasted`, the submitted code is stored in `pasted_code`.

When `submission_type` is `uploaded`, `pasted_code` remains empty and the uploaded files are represented in the `submission_files` table.

#### Submission Status Values

The `status` field can use values such as:

- `pending`
- `processing`
- `completed`
- `failed`

### 3.3 `submission_files` Table

The `submission_files` table stores information about individual source code files uploaded by a user.

| Column | Data Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | Primary Key, Default `gen_random_uuid()` | Unique identifier for each uploaded file |
| `submission_id` | UUID | Foreign Key → `submissions.id`, NOT NULL | Submission to which the file belongs |
| `file_name` | VARCHAR(255) | NOT NULL | Original name of the uploaded file |
| `file_extension` | VARCHAR(20) | NOT NULL | File extension such as `.js` or `.py` |
| `language` | VARCHAR(50) | NOT NULL | Programming language of the file |
| `file_content` | TEXT | NOT NULL | Source code content read from the uploaded file |
| `created_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Time when the file record was created |

#### File Storage Decision

Uploaded source code files will be stored only temporarily on the backend while they are being validated and processed.

The permanent database record will store the source code content in the `file_content` column instead of storing a permanent local file path.

This avoids depending on temporary server storage and allows previous review reports to remain available after deployment.

One submission can contain multiple uploaded files.

### 3.4 `reviews` Table

The `reviews` table stores the overall result and summary of a completed code review.

| Column | Data Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | Primary Key, Default `gen_random_uuid()` | Unique identifier for each review |
| `submission_id` | UUID | Foreign Key → `submissions.id`, NOT NULL | Submission being reviewed |
| `overall_score` | DECIMAL(5,2) | NULL | Overall code quality score |
| `summary` | TEXT | NULL | Overall review summary |
| `code_explanation` | TEXT | NULL | AI-generated explanation of the submitted code |
| `generated_documentation` | TEXT | NULL | AI-generated documentation for the code |
| `created_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Time when the review record was created |
| `completed_at` | TIMESTAMPTZ | NULL | Time when review processing finished |

#### Review Storage Decision

A review combines the overall results produced by:

- Static code analysis
- AI-based code review
- Complexity analysis

Detailed individual issues are stored separately in the `review_findings` table.

Complexity measurements are stored separately in the `complexity_metrics` table.

### 3.5 `review_findings` Table

The `review_findings` table stores each individual issue, warning, bug, or recommendation found during a code review.

| Column | Data Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | Primary Key, Default `gen_random_uuid()` | Unique identifier for each finding |
| `review_id` | UUID | Foreign Key → `reviews.id`, NOT NULL | Review to which the finding belongs |
| `source` | VARCHAR(30) | NOT NULL | Identifies where the finding came from |
| `category` | VARCHAR(50) | NOT NULL | Type of issue or recommendation |
| `severity` | VARCHAR(20) | NOT NULL | Importance level of the finding |
| `issue` | TEXT | NOT NULL | Short description of the problem |
| `explanation` | TEXT | NULL | Detailed explanation of the finding |
| `suggested_fix` | TEXT | NULL | Recommended way to improve or fix the code |
| `file_name` | VARCHAR(255) | NULL | File in which the finding occurred |
| `line_number` | INTEGER | NULL | Line number related to the finding |
| `created_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Time when the finding was created |

#### Finding Source Values

The `source` field can use values such as:

- `static_analysis`
- `ai_review`

#### Finding Category Examples

The `category` field can use values such as:

- `bug`
- `code_smell`
- `security`
- `performance`
- `style`
- `best_practice`
- `naming`
- `documentation`

#### Severity Values

The `severity` field can use values such as:

- `info`
- `low`
- `medium`
- `high`
- `critical`

### 3.6 `complexity_metrics` Table

The `complexity_metrics` table stores measurable code complexity information generated during a review.

| Column | Data Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | Primary Key, Default `gen_random_uuid()` | Unique identifier for each complexity record |
| `review_id` | UUID | Foreign Key → `reviews.id`, NOT NULL | Review to which the metrics belong |
| `file_name` | VARCHAR(255) | NULL | File for which the metrics were calculated |
| `cyclomatic_complexity` | INTEGER | NULL | Number of independent execution paths |
| `function_complexity` | JSONB | NULL | Complexity values for individual functions |
| `file_complexity` | INTEGER | NULL | Overall complexity value for the file |
| `function_count` | INTEGER | NOT NULL, Default `0` | Number of functions detected |
| `class_count` | INTEGER | NOT NULL, Default `0` | Number of classes detected |
| `lines_of_code` | INTEGER | NOT NULL, Default `0` | Number of source code lines |
| `created_at` | TIMESTAMPTZ | NOT NULL, Default `NOW()` | Time when the metrics were created |

#### Function Complexity Storage

The `function_complexity` column uses PostgreSQL `JSONB` so that complexity values for multiple functions can be stored in a structured format.

Example:

```json
{
  "calculateTotal": 3,
  "validateUser": 5
}

## 4. Database Relationships

The main database relationships are:

1. One user can create many submissions.
2. One submission belongs to one user.
3. One submission can contain many uploaded files.
4. One uploaded file belongs to one submission.
5. One submission can have one review.
6. One review belongs to one submission.
7. One review can contain many review findings.
8. One review can contain many complexity metric records.

The relationship structure is:

```text
users
  │
  │ One-to-Many
  ▼
submissions
  │
  ├── One-to-Many ──► submission_files
  │
  └── One-to-One ───► reviews
                           │
                           ├── One-to-Many ──► review_findings
                           │
                           └── One-to-Many ──► complexity_metrics


                           ## 5. Data Deletion and Cascade Rules

The database will use cascade deletion for dependent records.

The following rules will apply:

- If a user is deleted, all submissions belonging to that user will also be deleted.
- If a submission is deleted, all related submission files and the related review will also be deleted.
- If a review is deleted, all related review findings and complexity metrics will also be deleted.

These rules prevent orphaned records from remaining in the database.

### Cascade Structure

```text
Delete User
  └── Delete Submissions
        ├── Delete Submission Files
        └── Delete Review
              ├── Delete Review Findings
              └── Delete Complexity Metrics


 ## 6. Key Database Design Decisions

The final schema is based on the actual application requirements and makes the following decisions:

- The original `projects` table is replaced by the `submissions` table.
- The unnecessary `github_url` field is removed because GitHub repository analysis is outside the project scope.
- Pasted source code is stored in `submissions.pasted_code`.
- Uploaded source code is represented by records in `submission_files`.
- Uploaded files are stored only temporarily on the backend during processing.
- The source code content of uploaded files is stored permanently in the database for review history.
- Static analysis and AI findings share the `review_findings` table and are distinguished using the `source` field.
- Complexity measurements are stored separately in `complexity_metrics`.
- Function-level complexity values use PostgreSQL `JSONB`.
- Dependent records use cascade deletion to prevent orphaned data.

This design is scalable enough for the required features while remaining practical for a two-week internship project.             