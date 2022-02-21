import {Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToOne,BaseEntity,CreateDateColumn} from "typeorm";



@Entity()
export class Actor extends BaseEntity {
 
  @PrimaryGeneratedColumn()
  id: string;
 
  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  biography: string;


  @Column("simple-array", {nullable: false})  
  comments: string [];  

  @Column("simple-array", {nullable: false})  
    commentAuthors: string [];  
  
   @Column({nullable: false})  
  like: number;   


  @Column()
  creator:string;

  @Column()
  photo: string;

  @Column()
  @CreateDateColumn()  
  createDate: Date;

  @Column()

  shared: boolean;
  
 /*  @ManyToOne(() => User, (userId) => userId.actor, {
    eager: true,
    onDelete: 'CASCADE',
  })
  userId: User;

  @OneToMany(() => Comment, (comment) => comment.actor)
  comment: Comment[]; */

 /*  @OneToMany(() => Like, (like) => like.actor)
  like: Like[]; */
}

