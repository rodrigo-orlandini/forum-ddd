import { CreateQuestionUseCase } from "./create-question";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let sut: CreateQuestionUseCase;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

describe("Create Question Use Case", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();

		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to create a question", async () => {
		const { question } = await sut.execute({
			authorId: "1",
			title: "1",
			content: "New test answer"
		});
	
		expect(question.id).toBeTruthy();
		expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
	});
});