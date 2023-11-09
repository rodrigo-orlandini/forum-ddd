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
		const response = await sut.execute({
			instructorId: "1",
			questionId: "1",
			content: "New test answer"
		});
	
		expect(response.isRight()).toBeTruthy();
		expect(inMemoryAnswersRepository.items[0]).toEqual(response.value?.answer);
	});
});