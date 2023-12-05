import { _saveQuestion,
        _saveQuestionAnswer,
        _getUsers,
        _getQuestions } from "../utils/_DATA";


describe("_DATATests", ()=>{
    it('retreive initial data for users', async ()=>{
        const allUsers = await _getUsers();

        //console.log('The users are' + users);
         const numberOfUsers = Object.keys(allUsers).length;
         console.log('The number of usrs' + numberOfUsers);
        expect(numberOfUsers === 4).toBe(true);

    });

    it('retreive initial data for questions', async ()=>{
        const allQuestions = await _getQuestions();

        //console.log('The users are' + users);
         const numberOfQuestions = Object.keys(allQuestions).length;
         console.log('The number of usrs' + numberOfQuestions);
        expect(numberOfQuestions === 6).toBe(true);

    });

    it('save a question to the datafile', async ()=>{
        const sampleQuestion = {
            optionOneText : "Azure?",
            optionTwoText : "AWS?",
            author:"sarahedo",
        }
        const saveQuestion = await _saveQuestion(sampleQuestion);
        //console.log('The users are' + users);
        //if (!question.optionOneText || !question.optionTwoText || !question.author) {
         console.log('The question is ' + JSON.stringify(saveQuestion));
         const { author, optionOne, optionTwo } = saveQuestion;
         expect(author).toBe("sarahedo")
         expect(optionOne.text).toBe("Azure?")
         expect(optionTwo.text).toBe("AWS?")
    });

    it('fail to save a question with errr when wrong data is sent to the datafile', async ()=>{
        const sampleQuestion = {
            optionOneText : null,
            optionTwoText : "AWS?",
            author:"sarahedo",
        }
        await expect(_saveQuestion(sampleQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author')
    });

        it('saves an answer to the datafile', async ()=>{
        const sampleAnswer = {
            answer : "optionOne",
            qid : "vthrdm985a262al8qx3do",
            authedUser:"sarahedo",
        }
        const saveAnswer = await _saveQuestionAnswer(sampleAnswer);
        //if (!authedUser || !qid || !answer) {
        //  const { author, optionOne, optionTwo } = saveQuestion;
         expect(saveAnswer).toBe(true)
        //  expect(optionOne.text).toBe("Azure?")
        //  expect(optionTwo.text).toBe("AWS?")
    });

    it('rejects the invalid options provided to save question  answer to the datafile', async ()=>{
        const sampleAnswer = {
            answer : null,
            qid : "vthrdm985a262al8qx3do",
            authedUser:"sarahedo",
        }
        await expect(_saveQuestionAnswer(sampleAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer')

    });
})