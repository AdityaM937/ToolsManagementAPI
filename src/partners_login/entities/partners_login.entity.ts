import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index((relation: PartnersLogin) => [relation.id, relation.profileId], {
    unique: true
  })
@Entity()
export class PartnersLogin {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    profileId:number;

    @Column({ unique: true })
    username : string;

    @Column()
    password : string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @CreateDateColumn({ type: 'timestamp' })
    lastModified: Date;
    
}
