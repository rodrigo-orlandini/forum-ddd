import { CommentOnAnswerUseCase } from "./comment-on-answer";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";

let sut: CommentOnAnswerUseCase;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;

describe("Comment On Answer Use Case", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

		sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
	});

	it("should be able to comment on answer", async () => {
		const answer = makeAnswer();
		await inMemoryAnswersRepository.create(answer);

		await sut.execute({
			answerId: answer.id.toString(),
			authorId: answer.authorId.toString(),
			content: "Test comment"
		});
	
		expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual("Test comment");
	});
});