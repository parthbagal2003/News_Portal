import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity()
class User_2029 extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    userName!:string 

    @Column({unique:true})
    email!: string;

    @Column()
    password!:string

}

export  default User_2029