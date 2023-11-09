import { EditQuestionUseCase } from "./edit-question";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";

import { NotAllowedError } from "./errors/not-allowed-error";

let sut: EditQuestionUseCase;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

describe("Edit Question Use Case", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();

		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to edit a question", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityID("author-1")
		}, new UniqueEntityID("question-1"));

		await inMemoryQuestionsRepository.create(newQuestion);

		await sut.execute({
			authorId: "author-1",
			questionId: "question-1",
			title: "Test Question",
			content: "Test Content"
		});
	
		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			title: "Test Question",
			content: "Test Content"
		});
	});

	it("should not be able to edit a question from another user", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityID("author-1")
		}, new UniqueEntityID("question-1"));

		await inMemoryQuestionsRepository.create(newQuestion);

		const response = await sut.execute({
			authorId: "author-2",
			questionId: "question-1",
			title: "Test Question",
			content: "Test Content"
		});

		expect(response.isLeft()).toBeTruthy();
		expect(response.value).toBeInstanceOf(NotAllowedError);
	});
});