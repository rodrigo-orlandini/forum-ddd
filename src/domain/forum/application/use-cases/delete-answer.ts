import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	questionId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
	constructor (
		private answersRepository: AnswersRepository
	) {}

	public async execute({ authorId, questionId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const question = await this.answersRepository.findById(questionId);

		if(!question) {
			throw new Error("Question not found.");
		}

		if(authorId !== question.authorId.toString()) {
			throw new Error("Not allowed.");
		}

		await this.answersRepository.delete(question);

		return {  };
	}
}