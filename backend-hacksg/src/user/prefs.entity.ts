import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('prefs')
export class PrefsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ type: 'simple-array' })
    preferredVolunteerType: string[];

    @Column({ type: 'simple-array' })
    skills: string[];

    @Column({ type: 'simple-array' })
    personalityTraits: string[];

    @Column({ type: 'simple-array' })
    availableDays: string[];

    @Column()
    preferredLocation: string;

    @Column()
    additionalPreferences: string;

    @ManyToOne(() => UserEntity, (user) => user.prefs)
    user: UserEntity;
}

