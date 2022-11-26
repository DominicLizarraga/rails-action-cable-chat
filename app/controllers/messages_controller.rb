class MessagesController < ApplicationController

  def create
    # we need 3 things, message_content, user & chatroom_id
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message = Message.new(message_params)
    @message.chatroom = @chatroom
    @message.user = current_user

    @message.save
      ChatroomChannel.broadcast_to(
        @chatroom,
        message: render_to_string(partial: "message", locals: { message: @message }),
        sender_id: @message.user.id
      )
      head :ok # don't send a view, don't redirect

  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

end
