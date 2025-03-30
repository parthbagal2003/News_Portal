

import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import User_1990 from "./user";
import News_3000 from "./news";
import Like_3000 from "./likes";
import User_3000 from "./user";

@Entity()
class Comment_3000 extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    comment!:string 

    @ManyToOne(()=>User_3000,(user)=>user.news,{onDelete:"NO ACTION"})
    user!:User_3000

    @ManyToOne(()=>News_3000,(news)=>news.comments,{onDelete:"CASCADE"})
    news!:News_3000
    
    @OneToMany(()=>Like_3000,(like)=>like.user)
    likes!:Like_3000[]

}

export  default Comment_3000