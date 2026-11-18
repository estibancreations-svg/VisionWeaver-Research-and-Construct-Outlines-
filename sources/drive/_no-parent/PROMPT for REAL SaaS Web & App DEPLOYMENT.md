Original name: PROMPT for REAL SaaS Web & App DEPLOYMENT.pdf
Drive ID: 17yYYunpWmQogCftXTvXZcNwJMbgKmr_j
Parent folder: _no-parent/
Modified: 2026-02-11T16:33:03.760Z

                    Robert’s TechToolBox
Hey there!

If you found value in this video and want to support the channel:
Click     Subscribe to stay updated with the best tutorials on AI video tools, faceless
YouTube channels, and automation tips.
Want more step-by-step guides on text-to-video, voiceover AI, and YouTube
automation?
     Check out my full tutorial playlist here:  PLAYLIST LINK
Want more FREE Prompt Pack?
     Follow my Facebook Page:        Facebook Page
Below are some of the best tools I personally use to create content like this.
These are affiliate links — they cost you nothing extra, but if you decide to sign up, it helps
support the channel

20% OFF:                    Hostinger
     Try AI DeepAgent’s ChatLLM (Abacus AI): → ChatLLM
    Try Build App with Lovable: → [Lovable]
    Try AI App with Adalo: → [Adalo]
    Try Hosting & Domain: → [Hostinger]
    Try Google AI Studio → [Gemini]


                GET 50% OFF                    OpenArt Tool: [OpenArt]
    Dupdub for viral AI storytelling scripts      [Dupdud link]
    ElevenLabs for ultra-realistic voiceovers        [ElevenLabs link]
    Pikzels AI for thumbnail generation        [Pikzels link]
    CapCut for editing videos       [CapCut link]
    VidIQ for YouTube SEO optimization          [VidIQ link]
    Leonardo AI for cinematic visuals        [Leonardo link]
    NordVPN – 70% off secure browsing            [NordVPN link]
    VeePN – 40% off private access        [VeePN link]
    Fliki – Auto video generation tool     [Fliki link]
    InVideo – AI text-to-video creator      [InVideo link]
    KlingAI for Film visuals    [KlingAI]
     HeyGen – Best talking avatar AI                           [HeyGen link]
PROMPT A

CLIENT PLATFORM (PUBLIC SITE + STUDENT LOGIN + BUY & LEARN)

SYSTEM INSTRUCTION
You are a Full-Stack SaaS Engineer, LMS Architect, UX Designer, Payment Systems Expert, and
Security Engineer.
You are building a real production learning platform.
All security rules, data isolation, and payment logic must be enforced server-side.
If any feature is missing, add it automatically.

Do NOT ask questions.
Make smart professional assumptions.

────────────────────────────
PLATFORM OVERVIEW
Website Type: Course Marketplace / Learning Platform
Business Model: Free + Paid Courses
Primary Goal: Student signups & course sales
Users: Visitors → Students

────────────────────────────
PUBLIC ACCESS (NO LOGIN)
Visitors can:
• View Home
• Browse course catalog
• View free lessons
• Read blog
• See pricing

They CANNOT:
• Access paid lessons
• Track progress
• Purchase without account

────────────────────────────
STUDENT AUTHENTICATION

• Register with email + password
• Secure login
• Password hashing
• Session tokens
• Logout support

────────────────────────────
STUDENT PERMISSIONS

Students can:
• View only their own dashboard
• Enroll in free courses
• Buy paid courses
• View only their own enrolled courses
• Track their own progress
• View only their own orders

Students cannot:
• View other users
• Edit courses
• Access CMS

────────────────────────────
CORE FRONTEND PAGES

• Home
• Course Catalog
• Course Detail
• Lesson Player
• Pricing
• Login
• Signup
• Checkout
• Student Dashboard
• My Courses
• Order History

────────────────────────────
COURSE SYSTEM

COURSES
id, title, description, price, is_free, status, thumbnail

MODULES
id, course_id, title, order

LESSONS
id, module_id, title, video_url, content, order

ENROLLMENTS
id, user_id, course_id, status, progress

PAYMENTS
id, user_id, course_id, amount, status

────────────────────────────
PAYMENT FLOW

• Add to cart
• Checkout
• Payment
• On success → auto enroll
• Unlock lessons

────────────────────────────
SECURITY ENFORCEMENT
Every request must enforce:
WHERE user_id = CURRENT_LOGGED_IN_USER

Protect:
• Dashboard
• Lessons
• Orders

────────────────────────────
FINAL INSTRUCTION
Generate the complete frontend, backend, authentication, payments, dashboards, and secure
data isolation.




PROMPT B

ADMIN UPGRADE (ADD OWNER DASHBOARD & FULL CONTROL)

Paste this after Prompt A is complete.

SYSTEM INSTRUCTION
You are now upgrading the existing system with a secure Admin layer.
This must NOT break student access.

────────────────────────────
ADMIN ROLE

Create a new role: ADMIN

Only ADMIN can:
• Create, edit, delete courses
• Create, edit, delete modules & lessons
• Upload videos
• Set pricing
• Publish/unpublish courses
• Write & edit blog posts
• View all users
• View all enrollments
• View all payments
• Manage site layout
• Control SEO

Students must NEVER access admin features.

────────────────────────────
ADMIN AUTHENTICATION
• Separate admin login
• Role-based redirection
• Protected admin routes

────────────────────────────
ADMIN DASHBOARD

Include:
• Course builder
• Lesson editor
• Media manager
• Student manager
• Order manager
• Blog CMS
• Analytics
• Site settings

────────────────────────────
SECURITY RULE

Every admin request must check:
IF role != ADMIN → deny access

────────────────────────────
FINAL INSTRUCTION
Upgrade the platform with a secure admin dashboard, role enforcement, CMS, and content
controls without affecting student users.
     PROMPT 3: (Firebase Auth Only — No UI Redesign)

Connect my existing web app to Firebase using the Firebase Web SDK (modular v9+).

Firebase Config

Use this exact Firebase config object:

[PASTE firebaseConfig HERE]



     HARD REQUIREMENTS (Must Follow)

Scope

     •       Use Firebase Authentication ONLY

     •       Do NOT use Firestore

     •       Do NOT use Storage

     •       Do NOT create or save user profile data anywhere

     •       Do NOT redesign or restructure the UI

UI

     •    Keep the current UI exactly the same

     •    Only wire up existing buttons/inputs and show errors using the existing UI patterns
          (example: existing error div, toast, alert, or inline message)



     Authentication Features (Email + Password)

Sign In

     •    Users can sign in using email + password via Firebase Auth

     •    If credentials are incorrect, display exactly:
          "Email or password is incorrect"

Sign Up

     •    Users can sign up using email + password via Firebase Auth

     •    If email already exists, display exactly:
          "User already exists. Please sign in"



     Flow Requirements

Redirect Rules
    •    On successful sign-in → redirect to /dashboard

    •    On successful sign-up → redirect to /dashboard

Logout

    •    Add a logout button (or wire the existing one) that:

             o   Signs the user out

             o   Redirects back to the auth screen (example: / or /auth)



    Implementation Rules (Very Important)

Firebase SDK Setup

    •    Use Firebase modular SDK imports (v9+)

    •    Initialize Firebase in one place only

    •    Export auth from a single firebase file/module

Session Handling

    •    Use onAuthStateChanged() to:

             o   Auto-redirect logged-in users to dashboard

             o   Prevent logged-out users from viewing dashboard

Error Handling (Exact Mapping)

Map Firebase errors to these exact messages:

Sign In errors

    •    auth/wrong-password

    •    auth/user-not-found

    •    auth/invalid-credential
         → Show: "Email or password is incorrect"

Sign Up errors

    •    auth/email-already-in-use
         → Show: "User already exists. Please sign in"

All other errors:

    •    Show a generic safe message:
         "Something went wrong. Please try again."



    Output Deliverables

Update the app by producing:
   1. A firebase.js (or equivalent) file that initializes Firebase and exports auth

   2. Updated auth logic for:

           o   sign in

           o   sign up

           o   logout

   3. A route guard or auth gate using onAuthStateChanged()

   4. No UI redesign — only connect logic to existing elements




   PROMPT 4 — Firebase Auth Email Verification (No Auto-Login, Block Unverified)

Implement Email Verification using Firebase Authentication ONLY (Firebase Web SDK
modular v9+).

Scope Rules

   •      Firebase Authentication only

   •      Do NOT use Firestore

   •      Do NOT use Storage

   •      Do NOT use any database

   •      Do NOT save user profiles

   •      Do NOT redesign the UI (only wire logic + minimal screen states)



   Core Email Verification Requirements

1) Sign Up Behavior (No Auto Login)

When a user registers with email/password:

   •   Create the account using Firebase Auth

   •   Immediately send a verification email

   •   Then sign the user out immediately

   •   Do NOT allow them to access the dashboard

   •   Redirect them to a verification screen
Verification screen message must show exactly:

“We have sent you a verification email to [user email]. Please verify it and log in.”

(Replace [user email] with the real email they entered.)



2) Verification Screen Requirements

The verification screen must include:

    •    The message above

    •    A Login button that takes the user to the login screen

    •    No extra UI redesign (use existing layout styles)



3) Login Behavior (Block Unverified Users)

When a user logs in with email/password:

    •    If the login succeeds BUT user.emailVerified === false:

              o   Immediately sign them out

              o   Block access to dashboard

              o   Show the same verification screen + same message:

“We have sent you a verification email to [user email]. Please verify it and log in.”



    Route Protection (Mandatory)

Use onAuthStateChanged() to protect routes:

Dashboard Access Rule

Only allow access if:

    •    user is logged in AND

    •    user.emailVerified === true

If user is:

    •    not logged in → show auth screen

    •    logged in but unverified → force logout and show verification screen



    Firebase SDK Implementation Rules

    •    Use Firebase modular v9+ imports

    •    Initialize Firebase once in firebase.js
    •   Export auth

    •   Use:

            o   createUserWithEmailAndPassword

            o   sendEmailVerification

            o   signInWithEmailAndPassword

            o   signOut

            o   onAuthStateChanged



    Error Handling Rules (Exact)

Sign Up

    •   auth/email-already-in-use
        → Show exactly:
        "User already exists. Please sign in"

Login

    •   auth/wrong-password

    •   auth/user-not-found

    •   auth/invalid-credential
        → Show exactly:
        "Email or password is incorrect"

All other errors:

    •   "Something went wrong. Please try again."



    Deliverables (Must Output)

Update the app to include:

    1. Verification screen state/page (no redesign)

    2. Sign-up flow:

            o   create user

            o   send verification email

            o   sign out immediately

            o   redirect to verification screen

    3. Login flow:

            o   block unverified users
              o   sign out immediately

              o   show verification screen

   4. Dashboard route guard enforcing verified-only access

   5. Logout button working normally for verified users




Prompt 5: Data to store for enrolled users
Enhance the current student dashboard for users enrolled in online courses by adding fully
functional learning and progress-tracking sections:

   1. My Courses

   2. Course Progress

   3. My Certificates

   4. Learning Activity

IMPORTANT RULES:

   •   Use Firebase Authentication + Firestore only.

   •   Do NOT use browser prompts (window.prompt / alert).

   •   Use clean in-app modals for all actions.

   •   Each user sees ONLY their own enrollment and progress data.

   •   Maintain the existing app UI style (cards, spacing, buttons).

====================
DATA STRUCTURE

Use Firestore under the authenticated user:

users/{uid}

   •   displayName

   •   email

   •   role

   •   createdAt

users/{uid}/enrollments/{enrollmentId}
    •   courseId

    •   courseTitle

    •   enrollmentDate

    •   status (active / completed / paused)

users/{uid}/progress/{courseId}

    •   totalLessons

    •   completedLessons

    •   progressPercent

    •   lastAccessedLesson

    •   updatedAt

users/{uid}/activity/{activityId}

    •   type (video / quiz / assignment)

    •   courseId

    •   duration (optional)

    •   score (optional)

    •   createdAt

users/{uid}/certificates/{certificateId}

    •   courseId

    •   issuedAt

    •   certificateUrl (optional)

====================
UI BEHAVIOR

My Courses

    •   Show enrolled courses as cards

    •   Status badge (active / completed)

    •   Empty + loading states

Course Progress

    •   Progress bar per course

    •   Lessons completed vs total

    •   Auto-update on activity

Learning Activity
    •   Timeline or list view

    •   Filter by course

My Certificates

    •   Show available certificates

    •   Download / view button

====================
MODALS (NO BROWSER PROMPTS)

    •   Enroll Course: confirm enrollment → save to Firestore

    •   Update Progress: auto-save on lesson completion

    •   Submit Quiz / Assignment: save score and attempt

All modals:

    •   Cancel / Save

    •   Validation

    •   Loading state

    •   Instant UI update after save

====================
SECURITY

Add Firestore rules so:

    •   Users can only read/write their own data

    •   request.auth.uid must match {uid}

====================
RESULT

After refresh:

    •   Enrollment persists

    •   Progress is accurate

    •   Counts update in real time

    •   No browser dialogs

    •   Dashboard feels like a real online learning platform
Prompt 6 for admin data storage:
   •   Active Courses

   •   Total Students

   •   Total Revenue

   •   New Orders

   •   Recent Sales

   •   Manage Courses

   •   Student Directory

   •   Sales History

   •   Blog CMS

This prompt is designed to work cleanly with Firebase Authentication + Firestore and supports
real counts shown on the dashboard.



   Admin Data Store – Best Prompt

Prompt:

Create a fully functional Admin Dashboard data system for an online course platform using
Firebase Authentication and Firestore. The admin dashboard must store, calculate, and display
real-time data matching the dashboard UI cards and management sections shown in the
current design.

====================
IMPORTANT RULES

   •   Use Firebase Authentication + Firestore only

   •   Do NOT use browser prompts (alert / window.prompt)

   •   Use in-app modals for all admin actions

   •   Only admin users can access admin data

   •   Dashboard metrics must reflect real-time Firestore data

   •   Maintain the existing UI style (cards, stats, lists)

====================
ADMIN DATA STRUCTURE

Use Firestore collections structured for scalability and accurate counts.

Admin Profile

admins/{adminId}

   •   displayName
   •   email

   •   role: "admin"

   •   createdAt

   •   lastLoginAt



Courses (used for Active Courses card)

courses/{courseId}

   •   title

   •   description

   •   price

   •   status (draft / active / archived)

   •   totalLessons

   •   totalDuration

   •   createdBy (adminId)

   •   createdAt

   •   updatedAt



Enrollments (used for Total Students)

enrollments/{enrollmentId}

   •   userId

   •   courseId

   •   courseTitle

   •   enrolledAt

   •   status (active / completed / cancelled)



Orders (used for New Orders & Recent Sales)

orders/{orderId}

   •   userId

   •   courseId

   •   courseTitle

   •   amount
   •   currency

   •   paymentStatus (paid / pending / failed)

   •   paymentMethod

   •   createdAt



Revenue (used for Total Revenue card)

Revenue is calculated dynamically from orders where paymentStatus == "paid"



Users (used for Student Directory)

users/{userId}

   •   displayName

   •   email

   •   role (student)

   •   registeredAt

   •   totalCoursesEnrolled

   •   lastActiveAt



Blog & News CMS

posts/{postId}

   •   title

   •   content

   •   status (draft / published)

   •   authorId (adminId)

   •   createdAt

   •   publishedAt (optional)



DASHBOARD METRICS LOGIC

   •   Active Courses: count of courses where status == "active"

   •   Total Students: unique count of users with role = student

   •   Total Revenue: sum of all paid orders

   •   New Orders: count of orders created today
    •   Recent Sales: last 5 paid orders sorted by createdAt

====================
UI BEHAVIOR

    •   Dashboard cards update in real time

    •   Clicking cards navigates to detailed views

    •   Empty states shown when no data exists

    •   Loading states used for all queries

====================
MODALS (NO BROWSER PROMPTS)

    •   Add / Edit Course

    •   Publish Blog Post

    •   Update Course Pricing

    •   Change Course Status

All modals must include:

    •   Validation

    •   Cancel / Save

    •   Loading indicator

    •   Instant UI refresh after save

====================
SECURITY

Firestore rules must ensure:

    •   Only admins can read/write admin collections

    •   Students cannot access admin data

    •   request.auth.token.role == "admin"

====================
RESULT

After refresh:

    •   Dashboard numbers are accurate

    •   Student directory reflects real users

    •   Revenue matches paid orders

    •   Courses can be managed correctly

    •   Admin dashboard feels like a real SaaS platform
PROMPT for Change Data Store with your website:
Create a detailed prompt that reads a screen image containing user data [for your webstie.],
accurately identifies all required fields, and stores them in Firebase for an Android Studio
application. Use the provided example prompt as a reference for formatting and behavior, but
adapt it to support my updated data fields: [Replace Prompt 5 here]. Ensure all fields are
captured correctly and mapped to the appropriate Firebase structure.




A: RULE for User Data only

rules_version = '2';

service cloud.firestore {

    match /databases/{database}/documents {

        // Root user document for your App

        match /users/{userId} {

            allow read, write: if request.auth != null && request.auth.uid == userId;

            // Anything nested inside this user (course, time):

            match /{allPaths=**} {

                allow read, write: if request.auth != null && request.auth.uid == userId;

            }

        }

    }

}
B: RULE for add Admin Dashboard



rules_version = '2';

service cloud.firestore {

 match /databases/{database}/documents {



  // Function to check if user is the designated admin

  function isAdmin() {

      return request.auth != null && request.auth.token.email == 'akshayman224@gmail.com';

  }



  // COURSES: Publicly readable, Admin writeable

  match /courses/{courseId} {

      allow read: if true;

      allow write: if isAdmin();



      // Sub-collections (lessons/modules) inherit or need specific rules

      match /{allSubcollections=**} {

          allow read: if true;

          allow write: if isAdmin();

      }

  }



  // USERS: Only owner or Admin can read/write

  match /users/{userId} {

      allow read, write: if request.auth != null && (request.auth.uid == userId || isAdmin());



      match /{allSubcollections=**} {

          allow read, write: if request.auth != null && (request.auth.uid == userId || isAdmin());

      }

  }
        // ORDERS & ENROLLMENTS: Admin can read all, User can create their own

        match /orders/{orderId} {

            allow read: if isAdmin();

            allow create: if request.auth != null;

        }



        match /enrollments_global/{id} {

            allow read: if isAdmin();

            allow write: if request.auth != null;

        }



        // BLOG POSTS: Publicly readable, Admin writeable

        match /posts/{postId} {

            allow read: if true;

            allow write: if isAdmin();

        }

    }

}
- Implement Google Sign-In and connect it with Firebase Authentication for user login




Short prompt to check app:
Please help double-check that all website functions are working properly. If any buttons, tabs,
or sections are inactive, fix them for the homepage, client dashboard (logged-in users), and
admin dashboard.



Please fix the following issues in the admin panel:
– Manage Courses: Unable to remove courses
– Student Directory: Newly registered students are not visible
– Blog & News CMS: Cannot add posts or display them on the homepage
– Total Students: Count is incorrect and does not match the actual number

For the student dashboard, please correct all incorrect numbers so they reflect the real-time
count of courses and progress. Also, review the dashboard and add any necessary functionality
if needed.

