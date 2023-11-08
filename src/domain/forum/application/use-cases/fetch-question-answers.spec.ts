import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";

let sut: FetchQuestionAnswersUseCase;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("Fetch Question Answers Use Case", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();

		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
	});

	it("should be able to fetch question answers", async () => {
		await Promise.all([
			inMemoryAnswersRepository.create(makeAnswer({
				questionId: new UniqueEntityID("question-1")
			})),
			inMemoryAnswersRepository.create(makeAnswer({
				questionId: new UniqueEntityID("question-1")
			})),
			inMemoryAnswersRepository.create(makeAnswer({
				questionId: new UniqueEntityID("question-1")
			}))
		]);

		const { answers } = await sut.execute({ 
			questionId: "question-1",
			page: 1 
		});

		expect(answers).toHaveLength(3);
	});

	it("should be able to paginate question answers", async () => {
		for(let i = 1; i <= 22; i++) {
			await inMemoryAnswersRepository.create(makeAnswer({
				questionId: new UniqueEntityID("question-1")
			}));
		}

		const { answers } = await sut.execute({ 
			questionId: "question-1",
			page: 2 
		});

		expect(answers).toHaveLength(2);
	});
});