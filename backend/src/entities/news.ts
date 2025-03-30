import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import User_1990 from "./user";
import Comment_1990 from "./comments";
import User_3000 from "./user";
import Comment_3000 from "./comments";

@Entity()
class News_3000 extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    title!:string 

    @Column()
    category!: string;

    @Column()
    language!:string;

    @Column({type:"text"})
    description!:string;

    @Column()
    fileName!:string;

    @Column()
    fileUrl!:string;

    @ManyToOne(()=>User_3000,(user)=>user.news,{onDelete:"CASCADE"})
    user!:User_3000

    @OneToMany(()=>Comment_3000,(comments)=>comments.news)
    comments!:Comment_3000
    

}

export  default News_3000