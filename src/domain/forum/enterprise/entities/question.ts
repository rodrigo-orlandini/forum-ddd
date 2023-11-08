import { Slug } from "./value-objects/slug";

import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

export interface QuestionProps {
	title: string;
	slug: Slug;
	content: string;
	authorId: UniqueEntityID;
	bestAnswerId?: UniqueEntityID;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
	get title() {
		return this.props.title;
	}

	get slug() {
		return this.props.slug;
	}

	get content() {
		return this.props.content;
	}

	get authorId() {
		return this.props.authorId;
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, "days") <= 3;
	}

	get excerpt(): string {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);
		this.touch();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	public static create(props: Optional<QuestionProps, "createdAt" | "slug">, id?: UniqueEntityID) {
		const question = new Question({
			...props,
			slug: props.slug ?? Slug.createFromText(props.title),
			createdAt: props.createdAt ?? new Date()
		}, id);

		return question;
	}
}
