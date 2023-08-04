import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

class TextRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

    async def receive(self, text_data):
        message_data_json = json.loads(text_data)
        id = message_data_json["id"]
        text = message_data_json["text"]
        time = message_data_json["time"]
        user = message_data_json["user"]
        message = { 'id': id, 'text': text, 'time': time,'user': user }
        # self.send(text_data=json.dumps({"message": message}))
        # text = text_data_json['text']
        # sender = text_data_json['sender']
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            },
        )
    
    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))