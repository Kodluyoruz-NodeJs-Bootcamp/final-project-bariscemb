import {Entity, PrimaryGeneratedColumn, ManyToOne,Column, OneToMany,BaseEntity,CreateDateColumn,ManyToMany} from "typeorm";


@Entity()
export class Movie extends BaseEntity{
 
  @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column({nullable:false})   
    title: string;

    
    @Column("simple-array", {nullable: false})  
    comments: string [];  
    
    @Column("simple-array", {nullable: false})  
    commentAuthors: string [];  
    
 @Column({nullable: false})  
    like: number;  

    @Column()    
    description: string;


    @Column()
     photo: string

    @Column({nullable:true})
    creator:string;

    @Column()
    @CreateDateColumn()   
    createDate: Date;

    @Column()   
    shared: boolean;



/*     @ManyToOne(() => User, (userId) => userId.movie, {
      eager: true,
      onDelete: 'CASCADE',
    })
    userId: User;
  
    @OneToMany(() => Comment, (comment) => comment.movie)
    comment: Comment[]; */
  
    /* @OneToMany(() => Like, (like) => like.movie)
    like: Like[]; */
  
}