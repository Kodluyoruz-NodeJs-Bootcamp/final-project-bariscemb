import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string; 

  @Column()
  username: string; 

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})    
  token:string

  @Column()
  @CreateDateColumn()
  Created_at:Date
 
/*   @OneToMany(() => Movie, (movie) => movie.userId)
  movie: Movie[];

  @OneToMany(() => Actor, (actor) => actor.userId)
  actor: Actor[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[]; */
}




