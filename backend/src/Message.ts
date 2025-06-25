import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    role!: string; // permite qualquer valor suportado pela OpenAI

    @Column({ type: "text" })
    content!: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;
}