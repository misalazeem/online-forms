CREATE TABLE form_creators
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE forms
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES form_creators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions
(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    required BOOLEAN NOT NULL DEFAULT false,
    form_id INTEGER REFERENCES forms(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE options
(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    question_id INTEGER REFERENCES questions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE submissions
(
    id SERIAL PRIMARY KEY,
    form_id INTEGER REFERENCES forms(id),
    email VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email)
);



CREATE TABLE responses
(
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES submissions(id),
    question_id INTEGER REFERENCES questions(id),
    answer TEXT NOT NULL,
    email VARCHAR(255) REFERENCES submissions(email)
);


