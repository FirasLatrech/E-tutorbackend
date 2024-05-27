import { IsString } from "class-validator";

export class joinRoomDto{
    @IsString()
    roomId: string;
}