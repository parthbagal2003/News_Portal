import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import Comment_1990 from "./comments";
import User_1990 from "./user";
import Comment_3000 from "./comments";
import User_3000 from "./user";


@Entity()
 class Like_3000 {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id!: number;
 
  @ManyToOne(() => Comment_3000, comment => comment.likes,{onDelete:"CASCADE"})
  comment!: Comment_3000;
 
  @ManyToOne(() => User_3000, user => user.likes)
  user!: User_3000;

  
 
}

export default Like_3000