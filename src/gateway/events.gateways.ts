import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { joinRoomDto } from './dto/join-room-dto.dto';
import { NotificationEntity } from 'src/notifications/infrastructure/persistence/relational/entities/notification.entity';

@WebSocketGateway(8000, { transports: ['websocket'] })
export class GlobalEventsGateWay {
  private connctedClients = new Map<string, Socket>();

  constructor(private readonly JwtService: JwtService) {}
   
  handleConnection(client: Socket) {
    const token = client.handshake.headers.token || client.handshake.query.token;
   
    try {
        const ValidClient = this.JwtService.verify(String(token), {
            secret: process.env.AUTH_JWT_SECRET,
        });
        if (!ValidClient) {
            client.disconnect(true);
        } else {
            const ExistingClientConnected = this.connctedClients.get(ValidClient.id);
            if (ExistingClientConnected) {
                ExistingClientConnected.disconnect(true);
            }
            this.connctedClients.set(ValidClient.id, client);
        }
    } catch (error) {
        console.error('JWT verification error:', error.message);   
    }
}


  @SubscribeMessage('join')
  handleJoin(client: Socket, roomId: joinRoomDto) {
    console.log(roomId)
    client.join(roomId?.toString());
  } 

  @SubscribeMessage('leave')
  handleLeave(client: Socket, roomId: joinRoomDto) {
    client.leave(roomId.toString());
  }

  @SubscribeMessage('direct-notification')
  HandleCourseCommentedNotification(client: Socket, message: any) {
    client.to('direct-notification').emit('direct-notification',{notification:message as NotificationEntity})         
  }

  handleDisconnect(client: Socket){
    client.disconnect(true);
  }
}
