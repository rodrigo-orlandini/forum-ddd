import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Either, right } from "@/core/either";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, {
	answer: Answer;
}>

export class AnswerQuestionUseCase {
	constructor (
		private answersRepository: AnswersRepository
	) {}

	public async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityID(instructorId),
			questionId: new UniqueEntityID(questionId)
		});

		await this.answersRepository.create(answer);

		return right({ answer });
	}
}