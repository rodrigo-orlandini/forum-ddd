import { Question } from "../../enterprise/entities/question";

import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
	answerId: string;
	authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
	question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
	constructor (
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository
	) {}

	public async execute({
		answerId, authorId
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if(!answer) {
			throw new Error("Answer not found.");
		}

		const question = await this.questionsRepository.findById(answer.questionId.toString());

		if(!question) {
			throw new Error("Question not found.");
		}

		if(authorId !== question.authorId.toString()) {
			throw new Error("Not allowed. This question is not yours.");
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.save(question);

		return { question };
	}
}