Doubt Resolution System - https://doubt-resolution-system-008.herokuapp.com/

Nodejs - is an open-source and cross-platform JavaScript runtime environment.

ExpressJs- Node.js web application framework that helps creating a robust.

Passport - is authentication middleware for Node.js. Passport can be unobtrusively dropped in to any Express-based web application.

Passport-Local-Strategy - Passport strategy for authenticating with a username and password. By plugging into Passport, local authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

MongoDb- MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

Mongoose- provides a straight-forward, schema-based solution to model your application data.

API Calls-
"/student/sign-up" - providing {name, email, password}
and will respond with {student :{ name, email, type='S'}}

"/student/sign-in" - providing {email, password}
and will response with {Student:{name,email,type='S'}}

"/student/sign-out" - and response with { Student: undefined}

"/student/create-doubt" - providing {title, description } and response with {Doubt:{title, description}}

"/student/add-comment" - providing { text, doubtId }
and response will be {Doubt: {title, comments, description}}

"student/show-doubts" - response will be {Doubt:{title, description, solution, by, solvedBy, comments}}

"/assistant/sign-up"- providing {name, email, password, confirm_password} will response with {
Assistant:{name, email}
}

"/assistant/sign-in"- providing {email, password} will response with {Assistant:{name, email}}

"/assistant/sign-out" - will response with { Assistant: undefined}

"/assistant/doubts" - will response with {
Doubts: [ title, description , status:"NEW" || "ESCALATED", comments:[ by, text ]]
}

"/assistant/escalate-doubt/:id"- providing doubt id and will response with {Doubt:{title, description, status:"ESCALATED"}, Assistant:{ name, email, escalated+1, solved, doubt: undefined}}

"/assistant/solution-of-doubt/:id"- providing doubt id and solution , and will response with {Doubt: {...doubt, status:"SOLVED"}, Assistant:{...assistant, solved+1}}

"/assistant/taken-doubt/:id" - providing id of doubt and will response with {Assitant:{assistant, status:"BUSY"}, Doubt:{..doubt, status:"SOLVED"}}

"/teacher/sign-up"- providing {name, email, password, confirm_password} will response with {
Teacher:{name, email}
}

"/teacher/sign-in"- providing {email, password} will response with {Teacher:{name, email}}

"/teacher/sign-out" - will response with { Teacher: undefined}

"/teacher/show-assistants" - will response with {Assistant :[assistants], Doubts:[doubt] }

"/teacher/assistant-detail/:id" - will response with {AssitantDetail:{assistant}}
