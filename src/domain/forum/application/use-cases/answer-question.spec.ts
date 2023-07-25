import { AnswerQuestionUseCase } from "./answer-question";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let sut: AnswerQuestionUseCase;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("Answer Question Use Case", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();

		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it("should be able to answer a question", async () => {
		const { answer } = await sut.execute({
			instructorId: "1",
			questionId: "1",
			content: "New test answer"
		});
	
		expect(answer.id).toBeTruthy();
		expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
	});
});