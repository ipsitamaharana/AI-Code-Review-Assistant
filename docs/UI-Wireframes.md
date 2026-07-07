# AI Code Review Assistant

## UI Wireframes

### 1. Wireframe Overview

The UI wireframes define the planned structure and layout of the main screens of the AI Code Review Assistant before frontend development begins.

The interface will be designed to provide a clean, modern, responsive, and developer-friendly experience.

### 2. Planned Application Screens

The application will include the following main screens:

1. Landing Page
2. Sign Up Page
3. Login Page
4. Forgot Password Page
5. Dashboard
6. New Code Review Page
7. File Upload Interface
8. Review Processing State
9. Review Results Page
10. Review History Page
11. Detailed Review Report Page
12. User Profile Page
13. Not Found Page

### 3. Landing Page Wireframe

```text
+--------------------------------------------------------------+
| Logo: AI Code Review Assistant        Login      Get Started |
+--------------------------------------------------------------+
|                                                              |
|              AI-Powered Code Review Assistant                |
|                                                              |
|     Improve your code with static analysis and AI review     |
|                                                              |
|          [ Start Code Review ]    [ Learn More ]              |
|                                                              |
+--------------------------------------------------------------+
|                     Core Features                            |
|                                                              |
|  [ Static Analysis ] [ AI Review ] [ Complexity Analysis ]   |
|                                                              |
|  [ File Upload ]     [ Review History ] [ Documentation ]    |
|                                                              |
+--------------------------------------------------------------+
|                        How It Works                           |
|                                                              |
|     1. Submit Code  ->  2. Analyze  ->  3. View Results      |
|                                                              |
+--------------------------------------------------------------+
|                           Footer                             |
+--------------------------------------------------------------+

### 4. Authentication Pages Wireframe

#### 4.1 Sign Up Page

```text
+--------------------------------------------------------------+
|                 AI Code Review Assistant                     |
+--------------------------------------------------------------+
|                                                              |
|                     Create an Account                        |
|                                                              |
|              Name        [________________]                  |
|              Email       [________________]                  |
|              Password    [________________]                  |
|              Confirm     [________________]                  |
|                                                              |
|                    [ Create Account ]                        |
|                                                              |
|              Already have an account? Login                  |
|                                                              |
+--------------------------------------------------------------+

### 5. Main Dashboard Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  Welcome Back                                         |
| New Review       |                                                       |
| Review History   |  +-------------+ +-------------+ +-------------+      |
| Profile          |  | Total       | | Issues      | | Avg. Score  |      |
|                  |  | Reviews     | | Detected    | |             |      |
|                  |  +-------------+ +-------------+ +-------------+      |
|                  |                                                       |
|                  |  Quick Actions                                        |
|                  |  [ Start New Code Review ]                            |
|                  |                                                       |
|                  |  Recent Reviews                                       |
|                  |  +-------------------------------------------------+  |
|                  |  | Project / File | Language | Status | Date       |  |
|                  |  +-------------------------------------------------+  |
|                  |  | app.js         | JS       | Done   | Recent     |  |
|                  |  | main.py        | Python   | Done   | Recent     |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
+------------------+-------------------------------------------------------+


### 6. New Code Review Page Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  New Code Review                                      |
| New Review       |                                                       |
| Review History   |  Project / Review Name                                |
| Profile          |  [____________________________________________]        |
|                  |                                                       |
|                  |  Programming Language                                 |
|                  |  [ Select Language ▼ ]                                |
|                  |                                                       |
|                  |  Submission Method                                    |
|                  |  [ Paste Code ]        [ Upload Files ]                |
|                  |                                                       |
|                  |  +-------------------------------------------------+  |
|                  |  |                                                 |  |
|                  |  |          Monaco Code Editor                     |  |
|                  |  |                                                 |  |
|                  |  |          Paste source code here                 |  |
|                  |  |                                                 |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  [ Clear ]                         [ Analyze Code ]     |
|                  |                                                       |
+------------------+-------------------------------------------------------+


### 7. File Upload Interface Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  New Code Review                                      |
| New Review       |                                                       |
| Review History   |  Project / Review Name                                |
| Profile          |  [____________________________________________]        |
|                  |                                                       |
|                  |  Programming Language                                 |
|                  |  [ Select Language ▼ ]                                |
|                  |                                                       |
|                  |  Submission Method                                    |
|                  |  [ Paste Code ]        [ Upload Files ]                |
|                  |                                                       |
|                  |  +-------------------------------------------------+  |
|                  |  |                                                 |  |
|                  |  |        Drag and drop source code files here     |  |
|                  |  |                                                 |  |
|                  |  |                  or                             |  |
|                  |  |                                                 |  |
|                  |  |              [ Browse Files ]                   |  |
|                  |  |                                                 |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Selected Files                                       |
|                  |  +-------------------------------------------------+  |
|                  |  | app.js                         [ Remove ]        |  |
|                  |  | utils.js                       [ Remove ]        |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |                              [ Analyze Files ]          |
|                  |                                                       |
+------------------+-------------------------------------------------------+

### 8. Review Processing State Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |                 Analyzing Your Code                    |
| New Review       |                                                       |
| Review History   |                       [ Loader ]                        |
| Profile          |                                                       |
|                  |             Please wait while we review                |
|                  |                    your source code                    |
|                  |                                                       |
|                  |  +-------------------------------------------------+  |
|                  |  | ✓ Code received                                 |  |
|                  |  | ✓ Input validation completed                    |  |
|                  |  | ● Running static code analysis                  |  |
|                  |  | ○ Calculating complexity metrics                |  |
|                  |  | ○ Generating AI review                          |  |
|                  |  | ○ Preparing final report                        |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |           Do not close this page during analysis      |
|                  |                                                       |
+------------------+-------------------------------------------------------+


### 9. Review Results Page Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  Review Results                                       |
| New Review       |                                                       |
| Review History   |  Review: Authentication Module                        |
| Profile          |  Language: JavaScript        Overall Score: 78/100    |
|                  |                                                       |
|                  |  +------------+ +------------+ +------------+         |
|                  |  | Critical   | | Warnings   | | Suggestions|         |
|                  |  |     1      | |     4      | |     7      |         |
|                  |  +------------+ +------------+ +------------+         |
|                  |                                                       |
|                  |  [ Overview ] [ Issues ] [ Complexity ] [ AI Review ] |
|                  |  [ Documentation ]                                    |
|                  |                                                       |
|                  |  Review Summary                                       |
|                  |  +-------------------------------------------------+  |
|                  |  | Overall analysis summary and key findings       |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Detected Issues                                      |
|                  |  +-------------------------------------------------+  |
|                  |  | HIGH | Unused variable | app.js | Line 24       |  |
|                  |  | Explanation: ...                                |  |
|                  |  | Suggested Fix: ...                              |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  [ Start New Review ]          [ Back to History ]    |
|                  |                                                       |
+------------------+-------------------------------------------------------+

### 10. Review History Page Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  Review History                                       |
| New Review       |                                                       |
| Review History   |  [ Search reviews...              ] [ Filter ▼ ]      |
| Profile          |                                                       |
|                  |  +-------------------------------------------------+  |
|                  |  | Review Name | Language | Score | Date | Actions |  |
|                  |  +-------------------------------------------------+  |
|                  |  | Auth Module | JS       | 78    | ...  | View    |  |
|                  |  | API Review  | Python   | 85    | ...  | View    |  |
|                  |  | Utils Check | JS       | 91    | ...  | View    |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Actions for each review:                             |
|                  |  [ View Details ]   [ Delete ]                        |
|                  |                                                       |
|                  |                  [ Previous ] [ Next ]                 |
|                  |                                                       |
+------------------+-------------------------------------------------------+

### 11. Detailed Review Report Page Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  Detailed Review Report                               |
| New Review       |                                                       |
| Review History   |  Review: Authentication Module                        |
| Profile          |  Language: JavaScript        Score: 78/100            |
|                  |  Reviewed: Date and Time                               |
|                  |                                                       |
|                  |  Review Summary                                       |
|                  |  +-------------------------------------------------+  |
|                  |  | Complete summary of the code review             |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Static Analysis Findings                             |
|                  |  +-------------------------------------------------+  |
|                  |  | Severity | Issue | File | Line | Suggested Fix  |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Complexity Metrics                                   |
|                  |  +----------+ +----------+ +----------+               |
|                  |  | Cyclomatic| | Functions| | Classes  |               |
|                  |  | Complexity| | Count    | | Count    |               |
|                  |  +----------+ +----------+ +----------+               |
|                  |                                                       |
|                  |  AI Review                                             |
|                  |  +-------------------------------------------------+  |
|                  |  | Bugs, code smells, security, performance,       |  |
|                  |  | best practices, and refactoring suggestions     |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Generated Documentation                              |
|                  |  +-------------------------------------------------+  |
|                  |  | Functions, classes, and API documentation       |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  [ Back to History ]              [ Delete Review ]   |
|                  |                                                       |
+------------------+-------------------------------------------------------+

### 12. User Profile Page Wireframe

```text
+--------------------------------------------------------------------------+
| Logo: AI Code Review Assistant                  Profile        Logout     |
+------------------+-------------------------------------------------------+
|                  |                                                       |
| Dashboard        |  User Profile                                         |
| New Review       |                                                       |
| Review History   |  +-------------------------------------------------+  |
| Profile          |  |                 [ Profile Avatar ]              |  |
|                  |  |                                                 |  |
|                  |  |  Name       [____________________________]      |  |
|                  |  |                                                 |  |
|                  |  |  Email      [____________________________]      |  |
|                  |  |                                                 |  |
|                  |  |                       [ Save Changes ]          |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
|                  |  Account Information                                  |
|                  |  +-------------------------------------------------+  |
|                  |  | Member Since: Date                              |  |
|                  |  | Total Reviews: Number                           |  |
|                  |  +-------------------------------------------------+  |
|                  |                                                       |
+------------------+-------------------------------------------------------+

### 13. Not Found Page Wireframe

```text
+--------------------------------------------------------------+
|                                                              |
|                           404                                |
|                                                              |
|                    Page Not Found                            |
|                                                              |
|       The page you are looking for does not exist.           |
|                                                              |
|                    [ Go to Dashboard ]                       |
|                                                              |
+--------------------------------------------------------------+