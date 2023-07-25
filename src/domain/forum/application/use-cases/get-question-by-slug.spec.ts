import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";

let sut: GetQuestionBySlugUseCase;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

describe("Get Question By Slug Use Case", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();

		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to get a question by slug", async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionsRepository.create(newQuestion);

		const { question } = await sut.execute({
			slug: "example-question"
		});
	
		expect(question.id).toBeTruthy();
		expect(newQuestion.title).toEqual(question.title);
	});
});