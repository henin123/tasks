import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const newArray = questions.filter((q): boolean => q.published);
    //const f = newArray.map((q): string => );
    return newArray;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const newArray = questions.filter(
        (q): boolean =>
            q.options.length > 0 || !(q.body === "" && q.expected === "")
    );
    return newArray;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const newArray = questions.find((q): boolean => q.id === id);
    if (newArray != null) {
        return newArray;
    } else {
        return null;
    }
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const newA = findQuestion(questions, id);
    const newArray = questions.filter((q): boolean => newA !== q);
    return newArray;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const names = questions.map((justName): string => justName.name);
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const names = questions.map((justName): number => justName.points);
    const total = names.reduce(
        (currentSum: number, add: number) => currentSum + add,
        0
    );
    return total;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const names = questions.filter((justName): boolean => justName.published);
    const total = names.reduce(
        (currentSum: number, q: Question) => currentSum + q.points,
        0
    );
    return total;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const final = questions.map(
        (justName): string =>
            justName.id +
            "," +
            justName.name +
            "," +
            justName.options.length +
            "," +
            justName.points +
            "," +
            justName.published
    );
    return "id,name,options,points,published\n" + final.join("\n");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const newArray = questions.map(
        (question: Question): Answer => ({
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
    return newArray;
    /**
    const new1 = [...questions];
    const index = questions.findIndex((q) => q.id === targetId);
    const new2 = {
        ...questions[index],
        id: questionId,
        text: "",
        submitted: false,
        correct: false
    };
    new1[index] = new2;
    return new1;
    */
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const newArray = questions.map(
        (question: Question): Question => ({ ...question, published: true })
    );
    return newArray;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const checkOne = questions.every(
        (q: Question): boolean => q.type === "multiple_choice_question"
    );
    const checkTwo = questions.every(
        (q: Question): boolean => q.type === "short_answer_question"
    );
    return checkOne || checkTwo;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const new1 = [...questions, makeBlankQuestion(id, name, type)];
    return new1;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const new1 = [...questions];
    const index = questions.findIndex((q) => q.id === targetId);
    const new2 = {
        ...questions[index],
        name: newName
    };
    new1[index] = new2;
    return new1;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const new1 = [...questions];
    const index = questions.findIndex((q) => q.id === targetId);
    const new2 = {
        ...questions[index],
        type: newQuestionType,
        options:
            newQuestionType !== "multiple_choice_question"
                ? []
                : new1[index].options
    };
    new1[index] = new2;
    return new1;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const new1 = [...questions];
    const index = questions.findIndex((q) => q.id === targetId);
    const new2 = [...new1[index].options];
    const splitOne =
        targetOptionIndex !== -1
            ? new2.splice(targetOptionIndex, 1, newOption)
            : new2.splice(new2.length, 1, newOption);
    const finish1 = {
        ...questions[index],
        options: new2.length !== 0 ? [...new2] : [...splitOne]
    };
    new1[index] = finish1;
    return new1;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const new1 = [...questions];
    const index = questions.findIndex((q) => q.id === targetId);
    new1.splice(index + 1, 0, duplicateQuestion(newId, questions[index]));
    return new1;
}
