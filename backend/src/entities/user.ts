import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import News_3000 from "./news";
import Comment_1990 from "./comments";
import Like_1990 from "./likes";
import Comment_3000 from "./comments";
import Like_3000 from "./likes";

@Entity()
class User_3000 extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    userName!:string 

    @Column({unique:true})
    email!: string;

    @Column()
    password!:string;

    @Column({
        enum:["admin","user"]
    })
    role!:string

    @OneToMany(()=>News_3000,(news)=>news.user)
    news!:News_3000[]

    @OneToMany(()=>Comment_3000,(comment)=>comment.user)
    comments!:Comment_3000[]

    @OneToMany(()=>Like_3000,(like)=>like.user)
    likes!:Like_3000[]

}

export  default User_3000