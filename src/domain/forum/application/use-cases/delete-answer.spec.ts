import { DeleteAnswerUseCase } from "./delete-answer";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";

import { NotAllowedError } from "./errors/not-allowed-error";

let sut: DeleteAnswerUseCase;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("Delete Answer Use Case", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();

		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to delete an answer", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityID("author-1")
		}, new UniqueEntityID("answer-1"));

		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			authorId: "author-1",
			questionId: "answer-1"
		});
	
		expect(inMemoryAnswersRepository.items).toHaveLength(0);
	});

	it("should not be able to delete an answer from another user", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityID("author-1")
		}, new UniqueEntityID("answer-1"));

		await inMemoryAnswersRepository.create(newAnswer);

		const response = await sut.execute({
			authorId: "author-2",
			questionId: "answer-1"
		});

		expect(response.isLeft()).toBeTruthy();
		expect(response.value).toBeInstanceOf(NotAllowedError);
	});
});