import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
	constructor (
		private questionCommentsRepository: QuestionCommentsRepository
	) {}

	public async execute({ 
		authorId, questionCommentId 
	}: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

		if(!questionComment) {
			throw new Error("Question not found.");
		}

		if(questionComment.authorId.toString() !== authorId) {
			throw new Error("Not allowed. This question is not yours.");
		}

		await this.questionCommentsRepository.delete(questionComment);

		return {};
	}
}